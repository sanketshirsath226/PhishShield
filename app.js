const hamburger = document.querySelector('.header .nav-bar .nav-list .hamburger');
const mobile_menu = document.querySelector('.header .nav-bar .nav-list ul');
const menu_item = document.querySelectorAll('.header .nav-bar .nav-list ul li a');
const header = document.querySelector('.header.con');
const inputbar = document.querySelector('.search');
const inputbartext = document.querySelector('#searchtxt');
const img = document.querySelector('#img');
const title = document.querySelector('#title');
const messsage = document.querySelector('#Result #msg');
const body = document.querySelector('#body_modal');


let i=0;

hamburger.addEventListener('click', () => {
	hamburger.classList.toggle('active');
	mobile_menu.classList.toggle('active');
});

document.addEventListener('scroll', () => {
	var scroll_position = window.scrollY;
	if (scroll_position > 250) {
		header.style.backgroundColor = '#29323c';
	} else {
		header.style.backgroundColor = 'transparent';
	}
});

menu_item.forEach((item) => {
	item.addEventListener('click', () => {
		hamburger.classList.toggle('active');
		mobile_menu.classList.toggle('active');
	});
});

inputbar.addEventListener('click', () => {
	url = inputbartext.value;
	if(url!="")
	{
		if(check_url(url)==true)
		{
			$("#Success").modal('show');
			document.getElementsByTagName('body')[0].readOnly=true;
			detect_url(url);
		}
		else
		{
			if(i==0)
			{
			$("#Error").modal('show');
				i=1;
			}
			else
			{
				i=0;				
			}	
		}
	}
});

function check_url(myURL)
{
	var pattern = new RegExp('^(https?:\\/\\/)?'+ // protocol
            '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.?)+[a-z]{2,}|'+ // domain name
            '((\\d{1,3}\\.){3}\\d{1,3}))'+ // ip (v4) address
            '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ //port
            '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
            '(\\#[-a-z\\d_]*)?$','i');
            return pattern.test(myURL);
}
function detect_url(myUrl)
{
	console.log("Entered Successfull");
	$.ajax({
        type:"POST",
        url:"https://phish-shield-ml.herokuapp.com/post",
        dataType:'text',
        data : 
        {
			URL:myUrl
        },
		success: function(data)
		{
			inputbartext.value="";
			$("#Success").modal('hide');
			console.log(data)
			if(data=="-1")
			{
				img.style.background="url(img/fail.png)";
				img.style.backgroundRepeat="no-repeat";
				img.style.backgroundSize="contain";
				title.innerHTML="UNSAFE URL";
				messsage.innerHTML="The Url is detected as a Phishing Url.Please We Request not to Visit the Url.For More Information Click Read More."
				$("#Result").modal('show');
			}
			else if(data=="1")
			{
				img.style.background="url(img/success.png)";
				img.style.backgroundRepeat="no-repeat";
				img.style.backgroundSize="contain";
				title.innerHTML="Not Recognized URL";
				messsage.innerHTML="The Url is not recognized but url is safe to visit.You can safely Visit the url.For More Information Click Read More."
				$("#Result").modal('show');
			}
			else
			{
				img.style.background="url(img/notrecognized.png)";
				img.style.backgroundRepeat="no-repeat";
				img.style.backgroundSize="contain";
				title.innerHTML="SAFE URL";
				messsage.innerHTML="The Url is detected as a Safe Url (Not Phishing Url).You can safely Visit the url.For More Information Click Read More."
				$("#Result").modal('show');
			}
		},
        error: function(xhr,textStatus,err)
        {
            console.log("readyState: " + xhr.readyState);
            console.log("responseText: "+ xhr.responseText);
            console.log("status: " + xhr.status);
            console.log("text status: " + textStatus);
            console.log("error: " + err);
        }
        });
}
/*
function fadeout() {
    var fade= document.getElementById("body");
      
    var intervalID = setInterval(function () {
          
        if (!fade.style.opacity) {
            fade.style.opacity = 1;
        }
          
          
        if (fade.style.opacity > 0) {
            fade.style.opacity -= 0.1;
        } 
          
        else {
            clearInterval(intervalID);
        }
          
    }, 200);
*/


