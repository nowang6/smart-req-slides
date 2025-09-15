import React from 'react'
import { z } from 'zod'

const ImageSchema = z.object({
  __image_url__: z.url().meta({
    description: "URL to image",
  }),
  __image_prompt__: z.string().meta({
    description: "Prompt used to generate the image. Max 30 words",
  }).min(10).max(50),
})

const layoutId = "feature-description-slide"
const layoutName = "FeatureDescriptionLayout"
const layoutDescription = "A slide with a header, content, and footer."

const Schema = z.object({
  title: z.string().min(3).max(40).default("特性描述").meta({
    description: "Main title of the slide. Max 5 words",
  }),
  description: z.string().max(150).default("描述该特性的需求背景、涉及款型").meta({
    description: "Main description text explaining the feature or topic. Max 30 words",
  }),
  items: z.array(z.string().min(3).max(40)).min(2).max(4).default(["需求背景", "涉及款型"]).meta({
    description: "List of items or bullet points. Max 4 items",
  }),
  footerDate: z.string().min(10).max(20).default("09/12/2025").meta({
    description: "Footer date. Max 10 characters",
  }),
  footerPageNumber: z.string().min(1).max(5).default("5").meta({
    description: "Footer page number. Max 5 characters",
  })
})

type FeatureDescriptionSlideData = z.infer<typeof Schema>

interface FeatureDescriptionSlideLayoutProps {
  data?: Partial<FeatureDescriptionSlideData>
}

const dynamicSlideLayout: React.FC<FeatureDescriptionSlideLayoutProps> = ({ data: slideData }) => {
  const items = slideData?.items || []

  return (
    <>
      <div 
        className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden"
        style={{
            fontFamily: "微软雅黑"
        }}
      >
        <header className="bg-blue-800 text-white p-4">
          <h1 className="text-4xl font-bold">{slideData?.title || "特性描述"}</h1>
          <button className="bg-blue-200 text-blue-800 float-right px-4 py-2 rounded">{slideData?.items?.[1] || "本页由 FO 填写"}</button>
        </header>
        <section className="p-8">
          <p className="text-xl">{slideData?.description || "描述该特性的需求背景、涉及款型"}</p>
          <ul className="list-disc list-inside mt-6">
            {items.map((item, index) => (
              <li className="text-xl mt-2" key={index}>{item}</li>
            ))}
          </ul>
        </section>
        <footer className="bg-gray-100 text-gray-800 p-4 absolute bottom-0 w-full">
          <span>{slideData?.footerDate || "09/12/2025"}</span>
          <span className="float-right">{slideData?.footerPageNumber || "5"}</span>
        </footer>
      </div>
    </>
  )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }