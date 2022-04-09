const endpoint = "https://api.github.com/users";

const userPic = document.querySelector("#user-pic");
const userBio = document.querySelector("#user-bio");
const serachInput = document.querySelector("#serach-input");
const serachButton = document.querySelector("#serach-button");

const App = ()=>{

    let user = null;

    const GetUser = async (user)=>{

        try{

            const req = await fetch(`${endpoint}/${user}`);
            const json = await req.json();
            return json

        }catch(err){
            console.log(err);
        }

    }

    const UpdateInfos = (username,userpic,userbio)=>{
        userPic.setAttribute("src",userpic);
        userBio.innerHTML = userbio;
    }

    const RandomUser = async ()=>{

        const random = parseInt(Math.random() * 500);

        user = await GetUser(random);

        if(user.length > 0){

            UpdateInfos(null,user.avatar_url,user.bio);

        }else{
           userBio.innerHTML = "Não foi possível realizar a requisição!"
        }

    }
    RandomUser();

    const SearchUser = async (inputvalue)=>{

        user = await GetUser(inputvalue);
        serachInput.value = '';
        
        if(user.user_bio){

            UpdateInfos(null,user.avatar_url,user.bio);

        }else{

            UpdateInfos(null,null,"Nenhum usuário encontrado!");
        }
    }

    const SetUser = ()=>{

        document.addEventListener("keydown",(e)=>{
            let serach = serachInput.value;
            if(e.keyCode === 13 && serach.length > 0){
                SearchUser(serach);
                serach 
            }
        })

        serachButton.addEventListener("click",()=>{
            let serach = serachInput.value;
            if(serach.length > 0){
                SearchUser(serach);
            }
        })
        
    }
    SetUser();
}
App();