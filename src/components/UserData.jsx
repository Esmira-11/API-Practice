import { Link } from "react-router-dom"


function UserData({data}) {
    return(
        data.map(
            ({id, name, email, company: { name: companyName } }, i) =>(
                <tr key={id}>
                <th scope="row">{id}</th>
                <td>{name}</td>
                <td>{email}</td>
                <td>{companyName}</td>
                <td><Link to={`/users/${id}/posts`} className="btn btn-primary">See Posts</Link></td>
              </tr>
            )
          )
    )
}

export default UserData