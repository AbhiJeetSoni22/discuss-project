"use client"
import React from 'react'
import { Input } from './ui/input'
import { useSearchParams } from 'next/navigation'
import { search } from '@/actions/search'

const SearchInput = () => {
    const searchParams = useSearchParams()
  return (
    <form action={search}>
      
        <Input name='term' defaultValue={searchParams.get("term") || ""} type="text" placeholder="Search Post..." />
    </form>
  )
}

export default SearchInput
