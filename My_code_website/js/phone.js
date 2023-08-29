// loaded data for all
const loadphone=async(searchtext,isshow)=>{
    const res=await fetch(`https://openapi.programming-hero.com/api/phones?search=${searchtext}`)
    const data=await res.json()
    const phones=data.data
    displaycard(phones,isshow)
    // const phoness=phones.slice(0,12)
    const hideshow=document.querySelector('#hide-show-container')
    if(phones.length >= 12){
        hideshow.classList.remove('hidden')
    }
}
loadphone()



// dispaly data for websites
const phonecontainer=document.querySelector('.phone-container')
phonecontainer.textContent=''

const displaycard=(phones,isshow)=>{
 if(!isshow){
  phones=phones.slice(0,12)
 }
  phones.forEach(data=>{
    const divcreate=document.createElement('div')
    divcreate.classList='card w-[300px] bg-[#414a55] shadow-xl p-2'
    divcreate.innerHTML=`
    <figure><img src=${data?.image} /></figure>
    <div className="card-body text-center space-x-2">
       <h1 class="text-xl">Brand:${data.brand}</h1>
       <h1>${data.phone_name}</h1>
       <h1>${data.slug}</h1>
       <button onclick="showdetails('${data.slug}')" class="btn my-2 btn-active btn-secondary">Show Details</button>
    </div> `
    phonecontainer.appendChild(divcreate)
  })
  // Loading sppiner remove
  loading(false)
}
// search menu

const handlesearch=(isshow)=>{
     loading(true)
    const searchword=document.querySelector('#inputvalue')
    const searchtext=searchword.value
    loadphone(searchtext,isshow)
}

const loading=(isloading)=>{
  const sppiner=document.querySelector('#spinner')
  if(isloading){
    sppiner.classList.remove('hidden')
  }else{
    sppiner.classList.add('hidden')
  } 
}

// show all for buttons
function showall(){
  handlesearch(true)
}
// show details
const showdetails=async(id)=>{
  const res=await fetch(`https://openapi.programming-hero.com/api/phone/${id}`)
  const result=await res.json()
  handleshow(result?.data)
}

const handleshow=(result)=>{
  my_modal_3.showModal()
  const showmodal=document.querySelector('.show_modal')
  showmodal.innerHTML=`
  <img src=${result?.image} />
  <h3 class="font-bold text-lg">${result?.brand}</h3>
  <p class="py-4">${result?.releaseDate}</p>
  
  `
  console.log(showmodal)
  console.log(result)
}