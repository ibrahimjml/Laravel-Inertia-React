import React from 'react'
import Updateinfo from './Partials/Updateinfo'
import Updatepassword from './Partials/Updatepassword'
import DeleteAccount from './Partials/DeleteAccount'

export default function Edit({user}) {
  return (
            <div>
              <Updateinfo user={user}/>
              <Updatepassword />
              <DeleteAccount/>
            </div>
  )
}
