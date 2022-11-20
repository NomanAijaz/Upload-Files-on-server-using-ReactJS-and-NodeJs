import React, { useState } from 'react';
import { Avatar, Button, Card, Upload, Input, Space, Row, Col } from 'antd';
import { CloudUploadOutlined, MailOutlined,UploadOutlined } from '@ant-design/icons';


function App() {

  const[image, setImage] = useState(null);
  const[resume, setResume] = useState(null);

  const handleImage = (e)=>{
    setImage(e.file.originFileObj);
  }

  const handleResume = (e)=>{
    setResume(e.file.originFileObj);
  }

  return(<div className='m-5'>
  <Row>
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
        src={image !=null? URL.createObjectURL(image):"https://gw.alipayobjects.com/zos/rmsportal/JiqGstEfoWAOHiTxclqi.png"} 
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
    <Input size='large' type='email' placeholder=" Email" prefix={<MailOutlined />} />
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
    <Col></Col>
  </Row>


        </div>);
}

export default App;
