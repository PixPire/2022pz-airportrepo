function authUser(res,next)
{
    let id = Cookies.get('id');
    let role = Cookies.get('role');
    console.log("fffff");
    if(req.user==null)
    {
        res.status(401)
        return res.send("Musisz byc zalogowany");
    }
    next()
}

function authRole(role)
{
    console.log("aaaa");
    return (req,res,next)=>
    {
        if(req.user.role=="admin")
        {
        }
        else
        {
            if(req.user.role!==role)
            {
                res.status(403);
                res.send("Nie masz uprawnien");
            }
        }
        next();
    }
}


module.exports = {
 authUser,
 authRole
}