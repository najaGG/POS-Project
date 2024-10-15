{/*---------------- ไฟล์ config.js ช่วยจัดการ api และสิทธิการเข้าถึงของ admin ------------------ */}
const config ={
    api_path: 'http://localhost:3555',
    token_name:'pos_token',
    headers: () =>{
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('pos_token')
            }
        }
    }
}

export default config;
