import React, { useState } from 'react';
import { Avatar, Button, Card, Upload, Input, Space, Row, Col, message,Progress } from 'antd';
import { CloudUploadOutlined, DownloadOutlined } from '@ant-design/icons';
import {BASE_URL} from './constants'
import axios from 'axios';

function App() {

  const[image, setImage] = useState(null);
  const[resume, setResume] = useState(null);
  
  const[user, setUser] = useState({
    name:'',
    email:'',
  });
  
  const[loadData, setLoadData] = useState(null); 
  const[ID, setID] = useState(null);  
  const [loadings, setLoadings] = useState([]);

  const clearForm = ()=>{
    setImage(null);
    setResume(null);
    setUser({
      name:'',
      email:'',
    });

  }

  const handleImage = (e)=>{ 

    setImage(e.file.originFileObj);
  }

  const handleResume = (e)=>{

    setResume(e.file.originFileObj);
  }

  const handleUser = (e)=>{
    setUser({
      ...user,
      email: e.target.value,
    })
  }

  const handleEmail = (e)=>{
    setID(e.target.value);
  }

  const handleName = (e)=>{
    setUser({
      ...user,
      name: e.target.value,
    })
  }


  const enterLoading = (index) => {
    setLoadings((prevLoadings) => {
      const newLoadings = [...prevLoadings];
      newLoadings[index] = true;
      return newLoadings;
    });
    setTimeout(() => {
      setLoadings((prevLoadings) => {
        const newLoadings = [...prevLoadings];
        newLoadings[index] = false;
        message.success(`file uploaded successfully`);
        clearForm();
        return newLoadings;
      });
    }, 3000);    
  };

  const handleUploadOnServer = async ()=>{

    try {
      enterLoading(0);
      if(resume != null && image != null && user.email !=''){
          const form = new FormData();
          form.append('userName', user.name);
          form.append('userEmail', user.email);
          form.append('profileImage', image);
          form.append('resume', resume);

            
          const response = await axios.post(`http://localhost:3001/admin/postUserdata`,form);
          response.then(res=>{
            console.log(res.json());
            return res.json();

          }).then(data=>console.log(data)).catch(err=>console.log("Got Error in fetch data: ", err));

      }
    } catch (error) {
      
    }

  }  

  const handleLoadProfile = async ()=>{
        try {
                  
          const configObj = {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              userEmail:ID
            }),
          }

          await fetch(`http://localhost:3001/admin/getUserdata`,configObj).then(res=>res.json()).then(data=>setLoadData(data.data)).catch(err=>console.log("Got Error in fetch data: ", err));

        } catch (error) {
          
        }
  }

  const handleDownLoadResume = ()=>{
    
          let a = document.createElement('a');
					a.href = `http://localhost:3001/resume/${loadData['userResume']}`;
					a.download = loadData['userResume'];
          a.target ="_blank";
					a.click();  

  }



  return(
  <div className=' m-5'>
  <Row>
    <Space direction='horizental' size={50} style={{display:'flex'}} >
    <Col offset={24}>
    <Card
    hoverable
    style={{
      width: 300,
    }}
    cover={
     <div>
       <label htmlFor='image'>
       <img
        height={300}
        width={300}
        alt="example"
        src={image !=null? URL.createObjectURL(image):"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png"} 
      />
       </label>
      <input id='image' style={{display:'none'}} type='file' onChange={(e)=>{
        setImage(e.target.files[0]);
      }}/>
     </div>
    }
  >
   <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
    <Input placeholder=" Username" value={user.name} onChange={handleName} prefix={<Avatar src={image !=null? URL.createObjectURL(image):"https://joeschmoe.io/api/v1/random"} />} />
    <Input size='large' type='email' value={user.email} onChange={handleUser} placeholder=" Email" prefix={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Circle-icons-mail.svg/2048px-Circle-icons-mail.svg.png" />} />
    <Upload.Dragger

      onChange={handleResume}
    
    >
    + Upload Resume
   </Upload.Dragger>
    </Space>
    

    {
      image ==null? <div className='mt-3'>
      <Upload.Dragger
        onChange={handleImage}
      >
        {'+ Upload Image'}
      </Upload.Dragger>
      </div>: <div className='text-center p-3'>
    <Button loading={loadings[0]} type="primary" icon={<CloudUploadOutlined />} onClick={handleUploadOnServer}  >
            Upload On Server
          </Button>
    </div>
    }

    
  </Card>
    </Col>
    <Col offset={24}>
      <Card
      hoverable
      style={{width:300}}
      cover={
        <img
        height={300}
        width={300}
        alt="example"
        src={loadData==null?"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png":`http://localhost:3001/images/${loadData['userImage']}`} 
      />
      }
      >  

       <div className='text-center'>
      <Space direction='vertical' size='middle'>
        {loadData != null ?
         <>
          <h3>{loadData['userName']}</h3>
          <h6>{loadData['userEmail']}</h6>
          <Button type="primary" icon={<DownloadOutlined />} onClick={handleDownLoadResume} size='large'>Download Resume</Button>
         </> : 
         <>
         <Input size='large' type='email' placeholder=" Enter Email" onChange={handleEmail} prefix={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Circle-icons-mail.svg/2048px-Circle-icons-mail.svg.png" />} />
          <Button type="primary" icon={<DownloadOutlined />} size='large' onClick={handleLoadProfile}>Load Profile</Button> 
         </>
         
      }  
        
      
      </Space>
      </div>

      </Card>
    </Col>
    </Space>
  </Row>


        </div>);
}

export default App;
