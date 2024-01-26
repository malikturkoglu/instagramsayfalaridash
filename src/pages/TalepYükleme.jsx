import { useState, useEffect} from 'react';
import { db, storage } from '../firebase';
import { addDoc, collection, getDocs, doc, setDoc} from "firebase/firestore";
import { ref, uploadBytesResumable, getDownloadURL } from "firebase/storage";
import Sidebar from '../partials/Sidebar';
import Header from '../partials/Header';
 
function RegisterInstagramPageForm() {
    const [sidebarOpen, setSidebarOpen] = useState(false);
  const [name, setName] = useState('');
  const [address, setAddress] = useState('');
  const [followers, setFollowers] = useState();
  const [prices, setPrices] = useState({  story: '', post: '', all: '' }); // New state for prices
  const [images, setImages] = useState([]);




  const [selectedCategories, setSelectedCategories] = useState([]); // State for selected categories

    // ... fetchCategories function and useEffect ...

    // Function to handle category selection
    const handleCategoryChange = (category) => {
        setSelectedCategories(prev => {
            if (prev.includes(category)) {
                return prev.filter(cat => cat !== category);
            } else {
                return [...prev, category];
            }
        });
    };



  const [categories, setCategories] = useState([]); // State for categories
  // Function to fetch categories from Firestore
  const fetchCategories = async () => {
      const querySnapshot = await getDocs(collection(db, "categories"));
      const categoryList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setCategories(categoryList);
  };

  // Use effect to fetch categories on component mount
  useEffect(() => {
      fetchCategories();
  }, []);

  const uploadImage = (image) => {
    return new Promise((resolve, reject) => {
      const storageRef = ref(storage, `logos/${image.name}`);
      const uploadTask = uploadBytesResumable(storageRef, image);

      uploadTask.on('state_changed',
        (snapshot) => {},
        (error) => {
          console.error(error);
          reject(error);
        },
        async () => {
          const downloadURL = await getDownloadURL(uploadTask.snapshot.ref);
          resolve(downloadURL);
        }
      );
    });
  };

  const handleSubmit = async (e) => {
   e.preventDefault();  
    const imagesURLs = images.length > 0 
    ? await Promise.all(Array.from(images).map(uploadImage)) 
    : [];


    const numericFollowers = Number(followers);

    if (isNaN(numericFollowers)) {
        console.error('Invalid number of followers');
        // Handle error for invalid followers input
        return;
    }

  const requestData = {
    date: new Date().toISOString().slice(0,13),
    name,
    followers: numericFollowers,
    address,
    images: imagesURLs,
    prices: Object.values(prices).map(Number).filter(Boolean), // Convert prices to array of numbers
    categories: selectedCategories,
  };
  const requestDocRef = doc(db, 'pages', address); // Create a document reference with address as the ID
  await setDoc(requestDocRef, requestData);


  setName('');
  setFollowers(0);
  setAddress('');
  setImages([]);
  setPrices({ post: '', story: '', all: '' });
  setSelectedCategories([]);
  };

  return (
    <div className="flex h-screen overflow-hidden dark:bg-gray-800">

    <Sidebar sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

    <div className="relative flex flex-col flex-1 overflow-y-auto overflow-x-hidden dark:bg-gray-800">

        <Header sidebarOpen={sidebarOpen} setSidebarOpen={setSidebarOpen} />

        <main className="dark:bg-gray-800">

            <form onSubmit={handleSubmit} className="max-w-xl mx-auto p-7">
                <div className="flex flex-wrap -mx-3 mb-4 mt-10">
                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                        <label className="block text-gray-800 dark:text-gray-200 text-sm font-medium mb-1" htmlFor="Instagram Sayfa ismi">Instagram Sayfa ismi<span className="text-red-600">*</span></label>
                        <input id="Instagram Sayfa ismi" type="text" className="form-input w-full text-gray-800 dark:bg-gray-700 dark:text-gray-300" value={name} onChange={(e) => setName(e.target.value)} required/>
                    </div>

                    <div className="w-full md:w-1/2 px-3 mb-4 md:mb-0">
                        <label className="block text-gray-800 dark:text-gray-200 text-sm font-medium mb-1" htmlFor="Instagram Adresi">Instagram Adresi<span className="text-red-600">*</span></label>
                        <input id="Instagram Adresi" type="text" className="form-input w-full text-gray-800 dark:bg-gray-700 dark:text-gray-300" placeholder="@" value={address} onChange={(e) => setAddress(e.target.value)} required/>
                    </div>
                </div>

                <div className="w-full md:w-1/2 px-3 mb-4">
                  <label className="block text-gray-800 text-sm font-medium mb-1" htmlFor="logo">Instagram Logosu</label>
                  <input 
        type="file" 
        multiple 
        onChange={(e) => setImages(e.target.files)}
        required
      />
                </div>

                <div className="flex flex-wrap -mx-3 mb-4">


                    <div className="w-full px-3 mb-4 md:mb-0">
                        <label className="block text-gray-800 dark:text-gray-200 text-sm font-medium mb-1" htmlFor="followers">Takipçi</label>
                        <input id="followers" className="form-input w-full text-gray-800 dark:bg-gray-700 dark:text-gray-300" type="number" value={followers} onChange={(e) => setFollowers(e.target.value)} placeholder="+" required />
                    </div>
                </div>

          
                <div className="grid gap-5 md:grid-cols-3">

        <div className="px-3">
        <label className="block text-sm font-medium mb-1" htmlFor="Hikaye">Hikaye</label>
            <input  className="form-input w-full" id="story" type="number" placeholder="hikaye" value={prices.story} onChange={(e) => setPrices({ ...prices, story: e.target.value })} required/>
        </div>

        <div className="  px-3">
        <label className=" block text-sm font-medium mb-1" htmlFor="post">Post</label>
            <input className="form-input w-full" id="post" type="number" placeholder="post" value={prices.post} onChange={(e) => setPrices({ ...prices, post: e.target.value })} required/>
        </div>

        <div className="px-3">
        <label className="block text-sm font-medium mb-1" htmlFor="all">Hepsi</label>
            <input className="form-input w-full" id="all" type="number" placeholder="Hepsi" value={prices.all} onChange={(e) => setPrices({ ...prices, all: e.target.value })} required/>
        </div>

    </div>

                    <div className="mt-5 mb-1">Kategoriler</div>
                {/* Category selection */}
                <div className="flex">
              
                {categories.map(category => (
                    <label className="flex items-center ml-3" key={category.id}>
                        <input
                            type="checkbox"
                            className="form-checkbox"
                            value={category.name}
                            checked={selectedCategories.includes(category.name)}
                            onChange={() => handleCategoryChange(category.name)}
                        />
                       <span className="text-sm ml-0.5">{category.name}</span> 
                    </label>
                ))}
            </div>

                <div className="flex flex-wrap -mx-3 mt-6">
                    <div className="w-full px-3">
                        <button type="submit" className="btn bg-teal-300 hover:bg-teal-600 text-white mt-1 mb-16 w-full dark:bg-gray-600 dark:hover:bg-gray-500">
                            Gönder
                        </button>
                    </div>
                </div>
            </form>

        </main>
    </div>
</div>
  );
}

export default RegisterInstagramPageForm;