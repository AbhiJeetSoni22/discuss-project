'use server'

import * as auth from "next-auth/react"

export const signIn = async () => {
  return auth.signIn()
}