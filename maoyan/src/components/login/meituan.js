import React, { Component } from 'react';
import ReactDOM from 'react-dom'
import axios from "axios"
export default class meituan extends React.Component {
    render() {
        return (
            <div>
                <form action="" className={"form"}>
                    <div className={"dd-padding kv-line-r"} style={{

                    }}>
                        <input type="text" placeholder={"Email"} className={"meituan-login-username"}
                               ref={"phoneId"}
                               style={{
                                   outline:"none",
                               }}
                               onFocus={()=>{
                                   this.refs.phoneId.style.background="#d8d6d6"
                               }}
                               onBlur={()=>{
                                   this.refs.phoneId.style.background=""
                               }}
                        />
                    </div>
                    <div className={"dd-padding kv-line-r"}>
                        <input type="password" placeholder={"请输入密码"} className={"meituan-login-username"}
                               ref={"password"}
                               onBlur={() => {
                                   let password = this.refs.password.value
                                   if (password === "") {
                                       alert("请输入密码")
                                       return false}
                               }
                               }
                               style={{
                                   outline:"none",
                               }}
                               onFocus={()=>{
                                   this.refs.password.style.background="#d8d6d6"
                               }}
                               onBlur={()=>{
                                   this.refs.password.style.background=""
                               }}
                        />
                    </div>
                    <div>
                        <input type="button" value={"登录"}  ref={"login"} className={"meituan-login-button"} style={{
                            marginTop:"50px"
                        }}
                               onClick={()=>{
                                   let phoneId = this.refs.phoneId.value
                                   const reg = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im
                                   if (phoneId===""){
                                       alert("请输入邮箱账号")
                                       return false}
                                   if(!reg.test(phoneId)){
                                       alert("请输入正确的邮箱账号")
                                       return false
                                   }
                                   this.login.bind(this)()
                               }
                               }
                        />
                    </div>
                </form>
            </div>
        )}
    async login(){
        const data= await axios.post("/login/login",{
            phoneCode:this.refs.phoneId.value,
            passWord:this.refs.password.value
        })
        console.log(data.ok)
        let ok = data.ok
        if(ok==1){
            alert("登录成功")
            localStorage.phoneCode = this.refs.phoneId.value
            // this.props.history.go(-1)
        }
        if(ok!==1){
            alert("账号或密码错误")
        }
    }
}