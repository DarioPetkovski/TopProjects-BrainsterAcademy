import { useState, useEffect } from "react";
import { CardInterface } from "../../db";
import { useGlobalContext } from "../GlobalContext/Context";

function Create() {
    const [users, setUsers] = useState<string[]>([]);
    const [disabled, setDisabled] = useState<boolean>(false);

    const [formData, setFormData] = useState<CardInterface>({
        user: "",
        title: "",
        desc: "",
        img: "",
        timePosted: Date.now()
    });

    const {data} = useGlobalContext()

    useEffect(() => {
        fetch("https://jsonplaceholder.typicode.com/users")
            .then(res => res.json())
            .then(data => {
                const userNames = data.map((user: { name: string; }) => user.name);
                setUsers(userNames);
            });
    }, []);

    const onClickDisabled = () => {
        setDisabled(true);
    };

    const onChangeInput = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const onSubmitButton = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setFormData(prevState => ({
            ...prevState
        }));
        data.push(formData);
    };

    return (
        <div className="container d-flex justify-content-center text-center form-con mt-4 py-4">
            <form onSubmit={onSubmitButton} className="w-50">
                <p className="font-size">Enter a new post</p>
                <div className="d-flex justify-content-center  flex-column mt-3">
                    <label htmlFor="title">Post title:</label>
                    <input type="text" id="title" name="title" value={formData.title} onChange={onChangeInput} />
                </div>
                <div className="d-flex justify-content-center  flex-column mt-3">
                    <label htmlFor="desc">Post Description:</label>
                    <input type="text" id="desc" name="desc" value={formData.desc} onChange={onChangeInput} />
                </div>
                <div className="d-flex justify-content-center  flex-column mt-3">
                    <label htmlFor="user">User:</label>
                    <select id="user" name="user" onClick={onClickDisabled} onChange={onChangeInput}>
                        {!disabled && <option value="">Select user</option>}
                        {users.map((item, index) => (
                            <option key={index} value={item}>{item}</option>
                        ))}
                    </select>
                </div>
                <div className="d-flex justify-content-center  flex-column mt-3">
                    <label htmlFor="url">Post URL:</label>
                    <input type="text" id="url" name="img" value={formData.img} onChange={onChangeInput} />
                </div>
                {formData.desc === "" || formData.img === "" || formData.title === "" || formData.user === "" ? <button disabled className="mt-3 w-100 py-2 button" type="submit">Submit</button>:<button className="mt-3 w-100 py-2 button" type="submit">Submit</button>}
            </form>
        </div>
    );
}

export default Create;