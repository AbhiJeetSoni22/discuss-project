'use server'

import * as auth from "next-auth/react"

export const signOut = async () => {
 await auth.signOut()
}