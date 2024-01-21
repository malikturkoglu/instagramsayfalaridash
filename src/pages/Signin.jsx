
import { useState} from 'react';
import { signInWithEmailAndPassword} from 'firebase/auth';
import { auth } from "../firebase"
import  toast  from "react-hot-toast";
import { Navigate } from "react-router-dom";


export default function SignIn() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [user, setUser] = useState(false);


  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signInWithEmailAndPassword(auth, email, password);
      // Kullanıcı başarıyla oturum açarsa, panel sayfasına yönlendir
      setUser(true);
      toast.success('Başarıyla Giriş Yaptınız.')
    } catch (error) {
      toast.error(`[${error.message}].Bir hata ile karşılaştınız. Hatayı çözebilmemiz için lütfen bize bu hatayı bildiriniz.`)
    }
  };

  return (
<section className="bg-gradient-to-b from-blue-400 to-white h-screen flex items-center">
  <div className="max-w-6xl mx-auto px-4 sm:px-6">
    <div className="pb-12 md:pb-20">
          {/* Page header */}
          <div className="max-w-3xl mx-auto text-center pb-12 md:pb-20">
            <h1 className="h1 text-white">Panele Giriş</h1>
          </div>
          {user && (
          <Navigate to="/insta-dash/" replace={true} />
        )}
          {/* Form */}
          <div className="max-w-sm mx-auto">
            <form onSubmit={handleLogin}>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="email">Email</label>
                  <input id="email" type="email"  className="form-input w-full text-gray-800" 
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="E-posta adresiniz"
                  required />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mb-4">
                <div className="w-full px-3">
                  <div className="flex justify-between">
                    <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="password">Şifre</label>
                  
                  </div>
                  <input id="password" type="password" className="form-input w-full text-gray-800"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Şifreniz"
          required
                   />
                </div>
              </div>
              <div className="flex flex-wrap -mx-3 mt-6">
                <div className="w-full px-3">
                  <button className="btn text-white bg-blue-600 hover:bg-blue-700 w-full">Giriş Yapınız</button>
                </div>
              </div>
            </form>
         
          </div>

        </div>
      </div>
    </section>
  )
}
