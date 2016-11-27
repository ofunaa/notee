
var AuthorityUtil = {

    checkAuthority(page, now_user){
        switch(page){
            case "PostSection":
                switch(now_user.role){
                    case "root":
                        history.replaceState('', '', '/notee/users');
                        location.reload();
                }

        }
    }

}

module.exports = AuthorityUtil;
