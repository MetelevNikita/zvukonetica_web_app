import { StaticImageData } from "next/image"

export type menuType = {
  id: number
  label: string
  value: string
  link: string
}

export type socialType = {
  id: number
  label: string
  value: string
  link: string
  image: StaticImageData
}

export type infoType = {
  id: number
  title: string,
  icon: StaticImageData
}