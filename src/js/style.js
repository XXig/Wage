		document.body.addEventListener("touchmove",function(a){a.preventDefault()},!1);
	// document.querySelector(".main").addEventListener("touchmove",function(a){a.stopPropagation()},!1);
	var vm = new Vue({
		el: '#app',
		data: {
			yes:true,
			no:false,
			password:'',
			success:false,
			basesalary:'',
			basejj:'',
			rb:'0',
			rbsalary:'',
			sb:'0',
			sbsalary:'',
			dsb:'0',
			dsbsalary:'',
			jjsalary:'',
			allsalary:'',
			qjday:'0',
			qjdayoptions: [
			{text:'0',value:'0'},
			{text:'0.5',value:'0.5'},
			{text:'1',value:'1'},
			{text:'2',value:'2'},
			{text:'3',value:'3'}
			],
			cqjday:'',
			qjsalary:'',
			salary:''
		},
		ready: function () { 
			if (localStorage.success) {
				this.success=localStorage.success;
			}
			document.querySelector(".load").style.display="none";
			document.querySelector(".wrap").style.opacity="1";
			if(localStorage.basesalary){
				this.basesalary=localStorage.basesalary;
				this.rb=localStorage.rb;
				this.sb=localStorage.sb;
				this.dsb=localStorage.dsb;
				this.qjday=localStorage.qjday;
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
			btnnav:function(){
				if(this.basesalary||this.rb!=0||this.sb!=0||this.dsb!=0||this.qjday!=0){
					localStorage.removeItem("basesalary");
					localStorage.removeItem("rb");
					localStorage.removeItem("sb");
					localStorage.removeItem("dsb");
					localStorage.removeItem("qjday");
					this.basesalary='';
					this.rb=0;
					this.sb=0;
					this.dsb=0;
					this.qjday=0;
					this.alerttxt("重置数据成功")
				}
			},
			btnclose:function(){
				document.querySelector(".adide-bg").className="adide-bg";
			},
			btnon:function(){
				if(this.password){
					if (this.password==localStorage.num) {
						this.alerttxt("激活成功");
						document.querySelector(".adide-bg").className="adide-bg";
						this.success=localStorage.success=true;
					}
					else{
						this.alerttxt("激活码错误");
					}
				}
				else{
					this.alerttxt("请输入激活码");
				}
			},
			btn:function(){
				var ua=navigator.userAgent.toLowerCase();
				if ("micromessenger"!=ua.match(/MicroMessenger/i)) return this.alerttxt("请在微信中操作"),!1;
				var wl=window.localStorage;
				if (!this.success) {
					document.querySelector(".adide-bg").className+=" active";
					this.password='';
					if(wl&&!localStorage.num){
						var num=""; 
						for(var i=0;i<5;i++) 
						{ 
							num+=Math.floor(Math.random()*10); 
						} 
						localStorage.num=num;
					}
					var str = new Base64().encode(localStorage.num);  
					document.getElementById("num").innerHTML=str.split("=")[0];
					return !1;
				}
				if (this.basesalary=="") return this.alerttxt("请输入数据"),!1;
				if (this.qjday>=30) return this.alerttxt("请假天数不合理"),!1;
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
						this.jjsalary=200,
						this.basejj=0;
						break;
						case this.allsalary>=25000&&this.allsalary<30000:
						this.jjsalary=200,
						this.basejj=300;
						break;
						case this.allsalary>=30000&&this.allsalary<40000:
						this.jjsalary=500,
						this.basejj=300;
						break;
						case this.allsalary>=40000:
						this.jjsalary=800,
						this.basejj=300;
						break;
						default: 
						this.jjsalary=0,
						this.basejj=0;
						break; 
					}
					this.qjday>=3?this.cqjday=5:(this.cqjday=this.qjday);
					var _base=parseFloat(this.basesalary)+parseFloat(this.basejj);
					this.qjsalary=parseFloat((_base/30)*this.cqjday);
					this.salary=_base+this.rbsalary+this.sbsalary+this.dsbsalary+parseFloat(this.jjsalary)-parseFloat(this.qjsalary);
					if(wl){
						localStorage.basesalary=this.basesalary;
						localStorage.rb=this.rb;
						localStorage.sb=this.sb;
						localStorage.dsb=this.dsb;
						localStorage.qjday=this.qjday;
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