const endpoint = "https://api.github.com/users";

const userPic = document.querySelector("#user-pic");
const userBio = document.querySelector("#user-bio");
const serachInput = document.querySelector("#serach-input");
const serachButton = document.querySelector("#serach-button");
const userName = document.querySelector("#user-name");
const userFollowers = document.querySelector("#user-followers");
const userFollowing = document.querySelector("#user-following");

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
    const UpdateInfos = (user,pic,bio,followers,following)=>{
        userName.innerHTML = user;
        userPic.setAttribute("src",pic);
        userBio.innerHTML = bio;
        userFollowers.innerHTML = `${followers} Seguidores`;
        userFollowing.innerHTML = `${following} Seguindo`;
    }
    const SearchUser = async (inputvalue)=>{
        user = await GetUser(inputvalue);
        console.log(user);
        if(user.name){
            UpdateInfos(user.name,user.avatar_url,user.bio,user.followers,user.following);
        }else{
            UpdateInfos(`Usuário ${inputvalue} não encontrado`,"https://github.githubassets.com/images/modules/logos_page/GitHub-Mark.png",null,"","","");
        }
    }
    const SetUser = ()=>{
        document.addEventListener("keydown",(e)=>{
            let serach = serachInput.value;
            if(e.keyCode === 13 && serach.length > 0){
                SearchUser(serach);
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