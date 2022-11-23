import React, { useState } from 'react';
import { Avatar, Button, Card, Upload, Input, Space, Row, Col } from 'antd';
import { CloudUploadOutlined, MailOutlined, DownloadOutlined } from '@ant-design/icons';


function App() {

  const[image, setImage] = useState(null);
  const[resume, setResume] = useState(null);
  const[userEmail, setUserEmail] = useState('');
  const[loadData, setLoadData] = useState(null);  


  const handleImage = (e)=>{
    setImage(e.file.originFileObj);
  }

  const handleResume = (e)=>{
    setResume(e.file.originFileObj);
  }

  const handleLoadProfile = ()=>{
    console.log("Loaded");
    setLoadData("Loaded");
  }

  return(
  <div className=' m-5'>
  <Row>
    <Space direction='horizental' size={50} style={{display:'flex'}} >
    <Col>
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
    <Input placeholder=" Username" prefix={<Avatar src={image !=null? URL.createObjectURL(image):"https://joeschmoe.io/api/v1/random"} />} />
    <Input size='large' type='email' placeholder=" Email" prefix={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Circle-icons-mail.svg/2048px-Circle-icons-mail.svg.png" />} />
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
    <Button type="primary" icon={<CloudUploadOutlined />} >
            Upload On Server
          </Button>
    </div>
    }

    
  </Card>
    </Col>
    <Col>
      <Card
      hoverable
      style={{width:300}}
      cover={
        <img
        height={300}
        width={300}
        alt="example"
        src={"https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909__340.png"} 
      />
      }
      >  

       <div className='text-center'>
      <Space direction='vertical' size='middle'>
        <Input size='large' type='email' placeholder=" Enter Email" prefix={<Avatar src="https://upload.wikimedia.org/wikipedia/commons/thumb/e/ec/Circle-icons-mail.svg/2048px-Circle-icons-mail.svg.png" />} />
        {loadData != null ?
         <>
          <h3>Name</h3>
          <h6>email@gmail.com</h6>
          <Button type="primary" icon={<DownloadOutlined />} size='large'>Download Resume</Button>
         </> : 
          <Button type="primary" icon={<DownloadOutlined />} size='large' onClick={handleLoadProfile}>Load Profile</Button> 
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
