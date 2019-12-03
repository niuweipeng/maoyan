import React, {Component} from 'react'
import ReactDOM from 'react-dom'
import "../assets/css/login/index.css"
import axios from "axios"
import {
    BrowserRouter as Router,
    NavLink,
    Route,
    Link,
    Switch,
} from "react-router-dom"

export default class Register extends React.Component {
    constructor() {
        super();
        this.state = {
            checked: false,
            valicode:"获取验证码"
        }

    }

    render() {
        return (
            <div>
                <div className={"header"}>猫眼电影</div>
                <Router>
                    <div>
                        <input type="text" placeholder={"请输入您的手机号码或邮箱账号"} className={"meituan-login-username"}
                               style={{
                                   outline:"none",
                                   marginTop: "20px",
                               }} ref={"phoneCode"}/>
                    </div>
                    <div style={{
                        position: "relative"
                    }}>
                        <input type="number" placeholder={"验证码"} ref={"inpValidCode"} className={"meituan-login-username"}
                               style={{
                                   outline:"none",
                                   marginTop: "20px"
                               }}
                        />
                        <input type="button" ref={"validCode"} value={this.state.valicode} style={{
                            position: "absolute",
                            left: "275px",
                            top: "0",
                            border: "0",
                            height: "50px",
                            width: "100px",
                            outline:"none",
                        }}
                               onClick={() => {
                                   const phoneId = this.refs.phoneCode.value
                                   const regs = /[`~!@#$%^&*()_+<>?:"{},.\/;'[\]]/im//
                                   const rege = /^([0-9A-Za-z\-_\.]+)@([0-9a-z]+\.[a-z]{2,3}(\.[a-z]{2})?)$/g;
                                   const reg = /^1(3[0-9]|4[5,7]|5[0,1,2,3,5,6,7,8,9]|6[2,5,6,7]|7[0,1,7,8]|8[0-9]|9[1,8,9])\d{8}$/
                                   if (this.refs.phoneCode.value == "") {
                                       alert("请输入手机号或者邮箱账号")
                                       return false
                                   }
                                   if (!regs.test(phoneId)){
                                       if(!reg.test(phoneId)){
                                           alert("请输入正确的手机号码")
                                           return false
                                       }}
                                   if(regs.test(phoneId)){
                                       if (!rege.test(phoneId)){
                                           alert("请输入正确的邮箱账号")
                                           return false
                                       }
                                   }
                                   this.getValiCode.bind(this)()
                                   // if (this.refs.validCode.value = "undefined") {
                                   //     this.refs.validCode.value = "请稍等"
                                   // }
                               }}
                        />
                    </div>
                    <div>
                        <input type="password" placeholder={"密码"} ref={"password"} className={"meituan-login-username"}
                               style={{
                                   outline:"none",
                                   marginTop: "20px"
                               }}
                               onBlur={() => {
                                   const rea = /^(?=.*\d)(?=.*[a-zA-Z])[\da-zA-Z~!@#$%^&*]{6,18}$/
                                   if (this.refs.password.value == "") {
                                       alert("请输入密码")
                                       this.refs.register.disabled = true
                                       return false

                                   } else if (!rea.test(this.refs.password.value)) {
                                       alert("请输入正确的密码")
                                       this.refs.register.disabled = true
                                       return false
                                   }
                               }}

                        />
                    </div>
                    <div style={{
                        margin: "20px 0",
                    }}>
                        <input type="checkbox" ref={"Agreement"} onClick={() => {
                            this.setState({checked: !this.state.checked}, () => {
                                console.log(this.state.checked)
                                this.refs.validCode.value=this.state.valicode
                                // this.refs.validCode.value=  this.refs.inpValidCode.value
                            })


                        }}/>我已同意协议
                    </div>
                    <input type="button" value={"注册"} style={{
                        display: "block",
                        background: "#df2d2d",
                        color: "#f8f8f8",
                        border: 0,
                        height: ".94rem",
                        lineHeight: ".94rem",
                        fontSize: ".4rem",
                        width: "100%"
                    }} ref={"register"}
                           onClick={() => {
                               if (this.refs.inpValidCode.value != this.refs.validCode.value) {
                                   alert("请输入正确的验证码")
                                   return false
                               } else if (this.state.checked == false) {
                                   alert("请同意协议")
                                   return false
                               }
                               this.register.bind(this)()
                           }}
                    />
                </Router>
            </div>
        )
    }

    async register() {
        const data = await axios.post("/register", {
            phoneCode: this.refs.phoneCode.value,
            passWord: this.refs.password.value

        })
        console.log(data)
        alert(data.data.msg)
        if (data.data.ok==1){
            this.props.history.push("/login/phone")
        }
    }


    async getValiCode() {
        const data = await axios.get("/login/send", {
            params: {
                phoneCode: this.refs.phoneCode.value
            }
        })
        console.log(data)
        this.setState({valicode:data.code})
    }
}