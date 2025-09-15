import React from 'react'
import Header from '@/app/(presentation-generator)/dashboard/components/Header'
import { Metadata } from 'next'
import OutlinePage from './components/OutlinePage'
export const metadata: Metadata = {
  title: "演示文稿大纲",
  description: "自定义和组织您的演示文稿大纲。拖放幻灯片、添加图表，轻松生成演示文稿。",
  alternates: {
    canonical: "https://presenton.ai/create"
  },
  keywords: [
    "presentation generator",
    "AI presentations",
    "data visualization",
    "automatic presentation maker",
    "专业幻灯片",
    "data-driven presentations",
    "document to presentation",
    "presentation automation",
    "smart presentation tool",
    "business presentations"
  ]
}
const page = () => {
  return (
    <div className='relative min-h-screen'>
      <Header />
      <OutlinePage />
    </div>
  )
}

export default page
