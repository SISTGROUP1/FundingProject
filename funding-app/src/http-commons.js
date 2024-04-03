import axios from "axios";
// GET,POST,PUT,DELETE
// Rest -> 다른 프로그램과 연동
/*
    JSP = Server
    React = Server
    Ajax = Server
    Vue = Server
    -> RestFul

    GET/POST/PUT/DELETE
    -------- Web 주로 사용

    @PutMapping,@DeleteMapping
*/
export default axios.create({
    baseURL:"http://localhost",
    headers:{
        "Content-Type":"application/json"
    }
})