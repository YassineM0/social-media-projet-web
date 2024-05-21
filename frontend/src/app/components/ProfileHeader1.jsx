import React from 'react';
import LastColumn from "../components/LastColumn";
import Feed from './Feed';

const ProfileHeader1 = () => {
  return (
 
      <div className='flex flex-col'>
        <div className="relative h-5 w-auto mx-1.5 mt-1.5 ">
          <img src="/im11.jpg" className="w-full h-full rounded-3xl object-cover" />
          <div className='absolute bottom-0 right-2 translate-y-1/2 '>
            <img src="tarik.png" className='w-4 h-4 rounded-full border-4 border-gray'/>
          </div>

            <div className='absolute right-4.25 translate-y-1/4 text-3xl font-bold text-gray-800  '>
                <h1 className='inline'>Adil Chaoui</h1>
            </div>
            <div className='absolute bg-gray1 text-center w-3 h-1 text-white hover:bg-blue hover:text-black hover:tracking-wider rounded-md       transition-smooth duration-500 p-1 right-7 translate-y-1/2 '>
                <button className='inline text-sm font-sans '>Edit Profile</button>
          </div>
        </div>

        <div className='flex'>

        <div className=' flex flex-col'>

        <div className='bg-white border-3 border-gray2 rounded-mdd  mx-2 mt-4 w-fit h-fit'>
          <div className='font-bold text-2xl mt-1 text-gray-800 ml-1'>
            <h1>About me</h1>
          </div> 
          <div className='m-1 font-sans text-gray-600'>
            <p>
              Lorem ipsum dolor sit, amet consectetur adipisicing elit. Numquam veritatis ipsam delectus eligendi esse corrupti autem ullam, animi iure possimus recusandae temporibus nisi culpa minima rerum facilis deserunt? Temporibus ex quae quos saepe autem totam, modi quis minima repudiandae odit doloribus inventore neque esse perspiciatis, fugiat aliquam quam corrupti! Commodi, repellat optio, magni, iure temporibus quia labore dolor similique nihil modi saepe perspiciatis debitis dicta minus architecto maiores ducimus beatae id exercitationem tempore consequuntur natus impedit at ullam. Inventore unde quia, vero ab impedit ipsum? Fugiat odit ab totam saepe.
            </p>
          </div>
        </div>
          <div className="mx-2">
              <Feed />  
            </div>
        </div>
        <div className='flex flex-col'>
          <div className="flex flex-col items-center w-4.5 p-2 bg-white border-3 border-gray2 rounded-mdd space-y-2 ml-3  mt-4 h-fit ">
              <div className="flex flex-col space-y-1 text-center w-full">
                <div className="border-b-2 border-gray3 pb-2 ">
                  <p className="text-sm text-gray2">Date of Birth:</p>
                  <p className="text-lg font-semibold text-gray1">July 25, 2002</p>
                </div>
                <div className="border-b-2 border-gray3 pb-2">
                  <p className="text-sm text-gray2">Location:</p>
                  <p className="text-lg font-semibold text-gray1">Taourirt, Maroc</p>
                </div>
                <div className="">
                  <p className="text-sm text-gray2">Occupation:</p>
                  <p className="text-lg font-semibold text-gray1">Software Engineer</p>
                </div>
              </div>
            </div>
            <div className='mt-1 mr-4 w-5.5'>
                <LastColumn />
            </div>
        </div>
        </div>
      </div>
  );
}

export default ProfileHeader1;
