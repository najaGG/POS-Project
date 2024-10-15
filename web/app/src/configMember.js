{/*------------- ไฟล์ config.js ช่วยจัดการ api และสิทธิการเข้าถึงของผู้ใช้งาน --------------- */}
const config ={
    api_path: 'http://localhost:3555',
    token_name:'member_token',
    headers: () =>{
        return {
            headers: {
                'Authorization': 'Bearer ' + localStorage.getItem('member_token')
            }
        }
    }
}

export default config;
