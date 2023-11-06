import { useState, createContext, useEffect } from "react";
import { request } from "../apis/axios-utils";
import axios from "axios";

export const ProfileContext = createContext();

export const ProfileContextProvider = ({ children }) => {
  const [showProfileData, setShowProfileData] = useState({
    fullName: "",
    phoneNumber: "",
    email: "",
    address: "",
    pincode: "",
    state: "",
    country: "",
  });

  const [changePassword, setChangePassword] = useState({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [editProfile, setEditProfile] = useState(true);
  const [inputError,setInputError ] = useState({fieldName:"",errorMessage:""});

  // HANDLE PROFILE CHANGE AND UPDATE
  const handleProfileChange = (data) => {
    const { name, value } = data.target;
    setShowProfileData({ ...showProfileData, [name]: value });
  };

  const handleProfileEdit = () => {
    console.log(showProfileData,"hellonjxdhjbcgvhj");
  };

  // HANDLE PASSWORD CHANGE
  const handlePasswordChange = (data) => {
    const { name, value } = data.target;
    setChangePassword({ ...changePassword, [name]: value });
  };

  const handlePasswordEdit = async () => {
    try {
      const res = await request({ url:`/auth/changePassword`, method:"POST",data:changePassword});
      if(res.status === 200){
        console.log(res,"djebbbsjjs")
      }else{
        // throw new Error("")
      }
    } catch (error) {
      
    }
    
    console.log();
  };

  useEffect(() => {
    request({ url: `/auth/getUpdatedUserData` })
      .then((res) => {
        //  console.log(res);
        if (res.status === 200) {
          const { data } = res?.data;
          setShowProfileData({
            ...showProfileData,
            fullName: data?.name,
            email: data?.email,
            phoneNumber: data?.phone,
          });
        } else {
          // throw new Error()
        }

        // setCollars(formattedData);
      })
      .catch((err) => console.log(err.message));
  }, []);

  useEffect(() => {
    const delayDebounceFnc = showProfileData?.pincode? setTimeout(() => {
      axios.get(`https://api.postalpincode.in/pincode/${showProfileData?.pincode}`)
      .then((res) => {   
        if (res?.data[0]?.PostOffice) {
            //set the state and country
            setShowProfileData({
              ...showProfileData,
              state: res?.data[0]?.PostOffice[0]?.State,
              country: res?.data[0]?.PostOffice[0]?.Country,
            });
            // res.data[0].PostOffice[0].State
            // res.data[0].PostOffice[0].Country
          } else {
            setShowProfileData({
              ...showProfileData,
              state: "",
              country: "",
            });
            setInputError({fieldName:"pincode", errorMessage:"Pin code not found"})
          }
        })
        .catch((err)=> console.log(err))
    },2000):null
    return () => clearTimeout(delayDebounceFnc);

  }, [showProfileData?.pincode]);

  const handleProfileSaveChanges = () => {
    const body = {
      name: showProfileData?.fullName,
      email: showProfileData?.email,
      pincode: showProfileData?.pincode,
      address: {
        lin: showProfileData?.address,
        state: showProfileData?.state,
        country: showProfileData?.country,
      },
    };
    // try {
    //   const res = request({
    //     url: `/auth/update-user`,
    //     method: "PATCH",
    //     data: body,
    //   });
    //   if (res.status === 200) {
    //   } else {
    //   }
    // } catch (error) {}
  };

  return (
    <ProfileContext.Provider
      value={{
        showProfileData,
        changePassword,
        handlePasswordEdit,
        handleProfileChange,
        handleProfileEdit,
        handlePasswordChange,
        editProfile,
        setEditProfile,
        setShowProfileData,
        inputError
      }}
    >
      {children}
    </ProfileContext.Provider>
  );
};
