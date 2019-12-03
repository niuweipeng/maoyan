import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import axios from "axios"
export default class Phone extends React.Component {
    render() {
        return (
            <div>
                <form action="" className={"form"}>
                    <div className={"dd-padding kv-line-r"}>
                        <input type="text" placeholder={"手机号"} className={"meituan-login-username"}
                               ref={"phoneId"}
                               style={{
                                   outline:"none",
                               }}
                        />
                    </div>
                    <div className={"dd-padding kv-line-r"} style={{position:"relative"}}>
                        <input type="number" placeholder={"验证码"} className={"meituan-login-username"}
                               ref={"code"}
                               style={{
                                   outline:"none",
                               }}
                        />
                        <input type="button" ref={"valibutton"} value={"获取验证码"} style={{
                            position:"absolute",
                            left:"275px",
                            display:"block",
                            top:"0",
                            height:"50px",
                            width:"100px",
                            border:"0",
                            outline:"none",
                        }}
                               onClick={()=>{
                                   if (this.refs.phoneId.value===""){
                                       alert("请输入手机号")
                                       return false
                                   }
                                   this.getCode.bind(this)()
                               }}/>
                    </div>
                    <div>
                        <input type="button" value={"登录"} ref={"login"} className={"meituan-login-button"} style={{}}
                               onClick={()=>this.login.bind(this)()}
                        />
                    </div>
                </form>


            </div>

        )
    }
    async getCode(){
        const data = await axios.post("/login/plogin",{
            phoneCode:this.refs.phoneId.value,
        })
        console.log(data)
        if(data.ok == -1){
            alert(data.data.msg)
            this.refs.phoneId.value=""
            this.refs.valibutton.value="获取验证码"
            return false

        }
        this.refs.valibutton.value=data.code
    }
    async login(){
        if(this.refs.code.value==this.refs.valibutton.value){
            const data = await axios.post("/login/login",{
                phoneCode:this.refs.phoneId.value
            })
            console.log(data)
             if(data.ok==1){
            this.props.history.push("/my")
            }
        }else {
            alert("用户名或者手机号错误")
        }

    }
}