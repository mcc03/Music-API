const readAll = (req, res) => {

    res.status(200).json({
        "message" : "All users retrieved"
    });
}

const readOne = (req, res) => {

    let id = req.params.id;

    res.status(200).json({
        "message" : `User with id ${id} retrieved`
    });
}

const createData = (req, res) => {

    console.log(req.body);
    let data = req.body;

    if(data.password.length < 6){
        return res.status(422).json({
            "message" : "Password should be at least 6 characters"
        });
    }

    data.password = undefined;

    res.status(201).json({
        "message" : "User created",
        data
    });
}

const updateData = (req, res) => {
    
        let id = req.params.id;
        let data = req.body;

        //connect to db and check if user exists
        //check if data is valide, if yes update user with :id

        data.id = id;
    
        res.status(200).json({
            "message": `User with id ${id} updated`,
            data
        });
}

const deleteData = (req, res) => {

    let id = req.params.id;

    //connect to db and check if user exists, if yes, delete user with :id
    
    res.status(200).json({
        "message": `User with id ${id} deleted`
    });
}

module.exports = {
    readAll,
    readOne,
    createData,
    updateData,
    deleteData
};