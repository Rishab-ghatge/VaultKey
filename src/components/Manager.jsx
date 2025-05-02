import React from 'react'
import { useRef,useState,useEffect } from 'react'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { v4 as uuidv4 } from 'uuid';

const Manager = () => {
  
  const imgref = useRef()
  const passref = useRef()
  const [form, setform] = useState({site: "", username: "", password: ""})
  const [passwordArray, setpasswordArray] = useState([])

  useEffect(() => {
    let passwords = localStorage.getItem("passwords")
    if(passwords){
      setpasswordArray(JSON.parse(passwords))
    }
  }, [])

  const copyText = (text) =>{
    toast('Copied to clipboard!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    navigator.clipboard.writeText(text)
  }
  

  const showPassword = ()=>{
    if(passref.current.type === "password"){
      passref.current.type = "text"
      imgref.current.src = "icons/eye.png"
    }
    else{
      passref.current.type = "password"
      imgref.current.src = "icons/hidden.png"
    }
  }

  const savePassword = ()=>{
    if(form.site.length > 2 && form.username.length > 2 && form.password.length > 2){
    setpasswordArray([...passwordArray, {...form, id:uuidv4()}])
    localStorage.setItem("passwords", JSON.stringify([...passwordArray, {...form, id:uuidv4()}]))
    console.log([...passwordArray, form])
    setform({site: "", username: "", password: ""})
    toast.success('Password Saved!', {
      position: "top-right",
      autoClose: 2000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: false,
      draggable: true,
      progress: undefined,
      theme: "light",
      });
    }
    else{
      toast.error('Enter valid details', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
    }
  }

  const deletePassword = (id)=>{
    console.log("deleteing password with id : ", id)
    if(confirm("Confirm Delete")){
      setpasswordArray(passwordArray.filter(item=>item.id !== id))
      localStorage.setItem("passwords", JSON.stringify(passwordArray.filter(item=>item.id !== id)))
      toast('Password Deleted!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: false,
        draggable: true,
        progress: undefined,
        theme: "light",
        });
      // console.log([...passwordArray, form])
    }
  }

  const editPassword = (id)=>{
    console.log("Editing password with id : ", id)
    setform(passwordArray.filter(i=>i.id === id)[0])
    setpasswordArray(passwordArray.filter(item=>item.id !== id))
  }
  

  const handleChange = (e) => {
    setform({...form, [e.target.name]: e.target.value})
  }
  

  return (
    <>
    <ToastContainer
    position="top-right"
    autoClose={2000}
    hideProgressBar={false}
    newestOnTop
    closeOnClick
    rtl={false}
    pauseOnFocusLoss
    draggable
    pauseOnHover={false}
    theme="light"
    />

   <div className="absolute inset-0 -z-10 h-full w-full bg-white bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:14px_24px]"><div className="absolute left-0 right-0 top-0 -z-10 m-auto h-[310px] w-[310px] rounded-full bg-fuchsia-400 opacity-20 blur-[100px]"></div></div> 

    <div className=' p-2 md:p-0 md:mycontainer min-h-[86.1vh]'>
      <h1 className='text-4xl font-bold text-center'>
      <span className='text-violet-400'>&lt;</span>
      <span className='text-black'>Vault</span>
      <span className='text-violet-400'>Key/&gt;</span>
      </h1>
      <p className='text-lg text-center text-violet-800'>Your Own Password Manager</p>
    <div className='text-black flex flex-col p-4 gap-5 items-center'>
        <input value={form.site} onChange={handleChange} className='rounded-full px-4 py-1 w-full border-2 border-violet-300' type="text" name="site" placeholder='Website URL'/>
      <div className='flex flex-col md:flex-row w-full justify-between gap-2'>
        <input value={form.username} onChange={handleChange} className='rounded-full px-4 py-1 w-full border-2 border-violet-300' type="text" name="username" placeholder='Username' />
        <div className='relative'>
         <input value={form.password} onChange={handleChange} ref={passref} className='rounded-full px-4 py-1 w-full border-2 border-violet-300' type="password" name="password" placeholder='Password'/>
         <span className='absolute right-2 top-[7px] cursor-pointer' onClick={showPassword}>
           <img ref={imgref} width={22} src="icons/hidden.png" alt="hidden" />
         </span>
        </div>
      </div>
     <button onClick={savePassword} className='text-black font-medium border-2 flex gap-2 items-center bg-violet-400 rounded-full px-4 py-1 w-fit'>
      <lord-icon
        src="https://cdn.lordicon.com/jgnvfzqg.json"
        trigger="hover">
      </lord-icon>
        Add</button>
    </div>

      <div className='passwords'>
        <h2 className=' text-2xl font-bold py-4'>Your Passwords</h2>
        {passwordArray.length === 0 && <div>No passwords to show</div>}
        {passwordArray.length != 0 &&  <table className="table-auto w-full rounded-lg overflow-hidden mb-6">
          <thead className=' bg-violet-400'>
            <tr>
              <th className='py-2'>Website URL</th>
              <th className='py-2'>Username</th>
              <th className='py-2'>Password</th>
              <th className='py-2'>Actions</th>
            </tr>
          </thead>
          <tbody className='bg-violet-100 '>
            {passwordArray.map((item,index)=>{
              return <tr key={index}>
                        <td className='text-center py-2'>
                          <div className='flex justify-center items-center'>
                          <a href={item.site} target='_blank' className='break-all'>{item.site}</a>
                        <div className='cursor-pointer' onClick={()=>{copyText(item.site)}}>
                        <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            class="w-[17px] h-[17px] sm:w-[25px] sm:h-[25px] pt-1 pl-1">
                        </lord-icon>
                        </div>
                        </div>
                        </td>

                        <td className='text-center py-2'>
                        <div className='flex justify-center items-center'>
                          <span>{item.username}</span>
                        <div className='cursor-pointer' onClick={()=>{copyText(item.username)}}>
                        <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            class="w-[17px] h-[17px] sm:w-[25px] sm:h-[25px] pt-1 pl-1">
                        </lord-icon>
                        </div>
                        </div>
                        </td>

                        <td className=' text-center py-2'>
                        <div className='flex justify-center items-center'>
                          {/* <span className='break-all'>{item.password}</span> */}
                          <span className='break-all'>{"*".repeat(5)}</span>
                        <div className='cursor-pointer' onClick={()=>{copyText(item.password)}}>
                        <lord-icon
                            src="https://cdn.lordicon.com/lyrrgrsl.json"
                            trigger="hover"
                            class="w-[17px] h-[17px] sm:w-[25px] sm:h-[25px] pt-1 pl-1">
                        </lord-icon>
                        </div>
                        </div>
                        </td>

                        <td className='justify-center text-center py-2'>
                          <span className='cursor-pointer mx-2' onClick={()=>{editPassword(item.id)}}>
                            <lord-icon
                                src="https://cdn.lordicon.com/vwzukuhn.json"
                                trigger="hover"
                                style={{"width":"25px","height":"25px",  "paddingTop":"4px", "paddingLeft":"1px"}}>
                            </lord-icon>
                          </span>
                          <span className='cursor-pointer mx-2 '  onClick={()=>{deletePassword(item.id)}}>
                            <lord-icon
                              src="https://cdn.lordicon.com/nhqwlgwt.json"
                              trigger="hover"
                              style={{"width":"25px","height":"25px",  "paddingTop":"4px", "paddingLeft":"4px"}}>
                            </lord-icon>
                          </span>
                        </td>
                      </tr>
            })}
          </tbody>
        </table>
        }
      </div>
    </div>
    </>
  )
}

export default Manager