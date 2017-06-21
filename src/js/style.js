	document.body.addEventListener("touchmove",function(a){a.preventDefault()},!1);
	// document.querySelector(".main").addEventListener("touchmove",function(a){a.stopPropagation()},!1);
	var vm = new Vue({
		el: '#app',
		data: {
			yes:true,
			no:false,
			basesalary:'',
			rb:'0',
			rbsalary:'',
			sb:'0',
			sbsalary:'',
			dsb:'0',
			dsbsalary:'',
			jjsalary:'',
			allsalary:'',
			salary:''
		},
		ready: function () { 
			document.querySelector(".load").style.display="none";
			document.querySelector(".wrap").style.opacity="1";
			if(localStorage.basesalary){
				this.basesalary=localStorage.basesalary;
				this.rb=localStorage.rb;
				this.sb=localStorage.sb;
				this.dsb=localStorage.dsb;
			}
		},
		methods:{
			alerttxt:function(t){
				var _alert=document.querySelector(".alert"),
				click=!0;
				if (click) {
					click=!1;
					_alert.style.display="block";
					_alert.innerHTML=t;
					setTimeout(function(){
						click=!0;
						_alert.style.display="none";
					},450)
				}
			},
			btn:function(){
				var ua=navigator.userAgent.toLowerCase();
				if ("micromessenger"!=ua.match(/MicroMessenger/i)) return this.alerttxt("请在微信中操作"),!1;
				if (this.basesalary=="") return this.alerttxt("请输入数据"),!1;
				var _btn=document.querySelector(".btn-calculate");
				if (this.no==!1) {
					var _this=this;
					_btn.innerHTML="计算中...",_btn.style.opacity=".5";
					setTimeout(function(){
						_btn.innerHTML="重新计算",_btn.style.opacity="1";
						_this.no=!0,_this.yes=!1;
					},100)
					var _rb=parseFloat(this.rb),
					_sb=parseFloat(this.sb),
					_dsb=parseFloat(this.dsb);
					this.rbsalary=parseFloat(0.1*_rb);
					this.sbsalary=parseFloat(0.14*_sb);
					this.dsbsalary=parseFloat(0.12*_dsb);
					this.allsalary=_rb+_sb+_dsb;
					switch(!0) {
						case this.allsalary>=20000&&this.allsalary<25000:
						this.jjsalary=200;
						break;
						case this.allsalary>=25000&&this.allsalary<30000:
						this.jjsalary=500;
						break;
						case this.allsalary>=30000&&this.allsalary<40000:
						this.jjsalary=800;
						break;
						case this.allsalary>=40000:
						this.jjsalary=1100;
						break;
						default: 
						this.jjsalary=0;
						break; 
					}
					this.salary=parseFloat(this.basesalary)+this.rbsalary+this.sbsalary+this.dsbsalary+parseFloat(this.jjsalary);
					if(window.localStorage){
						localStorage.basesalary=this.basesalary;
						localStorage.rb=this.rb;
						localStorage.sb=this.sb;
						localStorage.dsb=this.dsb;
					}
				}
				else{
					_btn.innerHTML="立即计算";
					this.yes=!0;
					this.no=!1
				}
			}
		}
	})