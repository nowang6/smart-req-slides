import React from 'react'
import { z } from 'zod'

const layoutId = "characteristic-description-slide"
const layoutName = "CharacteristicDescriptionSlide"
const layoutDescription = "A slide with a title, description, list items, and footer text."

const Schema = z.object({
    title: z.string().min(1).max(100).default("特性描述").meta({
        description: "Title of the slide. Max 10 words"
    }),
    note: z.string().min(1).max(20).default("本页由 FO 填写").meta({
        description: "Note in the top right corner. Max 2 words"
    }),
    description: z.string().min(10).max(200).default("描述该特性的异常场景下的处理以及相关规格").meta({
        description: "Main description text. Max 20 words"
    }),
    bullets: z.array(z.string().min(2).max(80)).min(2).max(2).default([
        "异常场景描述",
        "相关规格"
    ]).meta({
        description: "List of bullet points. Max 2 items"
    }),
    date: z.string().min(1).max(15).default("09/12/2025").meta({
        description: "Date in the bottom left corner. Max 1 word"
    }),
    pageNumber: z.string().min(1).max(5).default("7").meta({
        description: "Page number in the bottom right corner. Max 1 word"
    })
})

type CharacteristicDescriptionSlideData = z.infer<typeof Schema>

interface CharacteristicDescriptionSlideProps {
    data?: Partial<CharacteristicDescriptionSlideData>
}

const dynamicSlideLayout: React.FC<CharacteristicDescriptionSlideProps> = ({ data: slideData }) => {
    const { title, note, description, bullets, date, pageNumber } = slideData || {}

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="bg-blue-900 text-white p-4 font-bold text-[48px] leading-[56px] font-[微软雅黑]">
                {title}
                <div className="absolute right-4 top-4 text-white bg-blue-200 text-sm p-2 rounded">
                    {note}
                </div>
            </div>
            <div className="p-8">
                <div className="text-[24px] leading-[32px] font-[微软雅黑]">
                    {description}
                </div>
                <ul className="list-disc pl-6 mt-6">
                    {bullets?.map((bullet: string, index: number) => (
                        <li key={index} className="text-[20px] leading-[24px] font-[微软雅黑]">
                            {bullet}
                        </li>
                    ))}
                </ul>
            </div>
            <div className="absolute bottom-8 left-8 text-[16px] leading-[20px] font-[微软雅黑]">
                {date}
            </div>
            <div className="absolute bottom-8 right-8 text-[16px] leading-[20px] font-[微软雅黑]">
                {pageNumber}
            </div>
        </div>
    )
}

export default dynamicSlideLayout
export { layoutId, layoutName, layoutDescription, Schema }
