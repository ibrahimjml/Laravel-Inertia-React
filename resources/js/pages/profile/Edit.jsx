import React from 'react'
import Updateinfo from './partials/Updateinfo'
import Updatepassword from './partials/Updatepassword'
import DeleteAccount from './partials/DeleteAccount'

export default function Edit({user}) {
  return (
            <div>
              <Updateinfo user={user}/>
              <Updatepassword />
              <DeleteAccount/>
            </div>
  )
}
