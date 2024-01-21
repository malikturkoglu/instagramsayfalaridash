
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword,
     signInWithEmailAndPassword, signOut, onAuthStateChanged, 
     updateProfile, sendEmailVerification, updatePassword,  
     signInWithPopup, GoogleAuthProvider, reauthenticateWithCredential, EmailAuthProvider   } from "firebase/auth";
import  toast  from "react-hot-toast";
import { getFirestore, collection,orderBy, addDoc, doc, onSnapshot,
      query, where, deleteDoc, serverTimestamp, updateDoc } from "firebase/firestore";
      import { getStorage } from 'firebase/storage';
      import { getAnalytics, isSupported } from "firebase/analytics";

      const firebaseConfig = {
        apiKey: "AIzaSyCtA-s0n3_yr_2R38hDi1touLanaG3Jh7Q",
        authDomain: "instagramsayfalar.firebaseapp.com",
        projectId: "instagramsayfalar",
        storageBucket: "instagramsayfalar.appspot.com",
        messagingSenderId: "344110452435",
        appId: "1:344110452435:web:5af63f72bce3270c94ce26",
        measurementId: "G-ZCR8N3XMVH"
      };

console.log("firebaseConfig:", firebaseConfig)
const app = initializeApp(firebaseConfig);
export const auth = getAuth();
export const db = getFirestore(app);
export const storage = getStorage(app);  // Firebase Storage'ı ekliyoruz


let analytics;
isSupported()
  .then((supported) => {
    if (supported) {
      analytics = getAnalytics(app);
    }
  })
  .catch((error) => {
    console.error("Firebase Analytics is not supported:", error);
  });

export { analytics };

export const register = async (email, password) => {
    try{
        const {user} = await createUserWithEmailAndPassword(auth, email, password)
        return user;
    } catch(error){
toast.error(error.message)
    }

}


export const login = async (email, password ) => {
    try{
       const { user } = await signInWithEmailAndPassword(auth, email, password);
       console.log("auth.currentUser, data: ", auth.currentUser)
       return user;
    } catch(error){
        toast.error(error.message)
    }
}



export const reAuth = async password  => {
    try{

        const credential = await EmailAuthProvider.credential(
            auth.currentUser.email,
            password
        )


       const { user } = await reauthenticateWithCredential(auth.currentUser, credential);
       return user;



    } catch(error){
        toast.error(error.message)
    }
}





const provider = new GoogleAuthProvider();
export const signInWithGoogle = async () =>{

  try{
    const { user } = await signInWithPopup(auth, provider);
    return user;
  }catch(error){
    toast.error(error.message)
  }

}



export const logout = async () => {
    try{
       const a  = await signOut(auth);
       console.log("AA", a)
       return true
    
    } catch(error){
        toast.error(error.message)
    }
}



export const update = async data => {
try{
    await updateProfile(auth.currentUser, data)
    toast.success("Profiliniz başarılı bir şekilde güncellenmiştir.")
    return true;
}catch(error){
toast.error(error.message)
}
}



export const resetPassword = async password => {
    try{
        await updatePassword(auth.currentUser, password)
        toast.success("Şifreniz güncellenmiştir. Bir sonraki login işleminizde belirlediğiniz şifreyi kullanabilirsiniz.")
        return true;
    }catch(error){
        toast.error(error.code)     
    }
    }


export const emailVerification = async () => {
    try{
       await sendEmailVerification(auth.currentUser);
       toast.success(` ${auth.currentUser.displayName} Bey, Doğrulama e-maili ${auth.currentUser.email} adresine gönderilmiştir.`);
    }catch(error){
  console.log(error)
    }
}


onAuthStateChanged(auth, (user) => {

});





export const addTodo = async data =>{
    try{
        data.createdAt = serverTimestamp();
        const result = await addDoc(collection(db, "todos"), data);
        console.log("result.id",result.id)
    }catch(error){
        toast.error(error.message);
    }

}


export const addCompany = async data =>{
    try{
        data.createdAt = serverTimestamp();

    //    const result = await addDoc(collection(db, "firmalar"), data);
  //      const result2 = await addDoc(collection(db, "firmalar").document("companyInfo"), data);
   //     console.log("result.id",result.id, "result2:", result2);


   const firmalarRef = collection(db, 'firmalar');
   const newFirmalarDoc = await addDoc(firmalarRef, {
    data,
   });
    
   const secondData ={
    companyName: "ikinci data",
    companyAddress:"second address",
   }
   // Create "companyInfo" sub-collection
   secondData.createdAt = serverTimestamp();
   const companyInfoRef = collection(newFirmalarDoc, 'companyInfo');
   await addDoc(companyInfoRef, {
     secondData
   });


    }catch(error){
        toast.error(error.message);
    }

}




export const addMeasurements = async data =>{
    try{
        console.log("buraya geldik add measurement")
        data.createdAt = serverTimestamp();
        const result = await addDoc(collection(db, "measurements"), data);
        console.log("result.id",result.id)
        console.log("buraya geldik add measurement result.id")
    }catch(error){
        toast.error(error.message);
        console.log("hata aldık error measurement", error)
    }

}


export const updateTodo = async (id, data) => {
    try{
   const todoRef = doc(db, "todos", id);
   await updateDoc(todoRef, data)
   toast.success("Todo Başarıyla Güncellenmiştir.")
   return true
    }catch(error){
    console.log("update Error", error)
    }
}



export const deleteTodo = async id => {
    try{
        return await deleteDoc(doc(db, "todos", id));
    }catch(error){
        toast.error(error.message);
    }
   
}



  



export default app;







/*
<!-- Google tag (gtag.js) -->
<script async src="https://www.googletagmanager.com/gtag/js?id=AW-11366246006">
</script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'AW-11366246006');
</script>


*/