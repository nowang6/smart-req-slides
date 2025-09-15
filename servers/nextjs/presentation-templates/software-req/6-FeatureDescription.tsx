import React from 'react'
import { z } from 'zod'

const layoutId = "feature-description-slide"
const layoutName = "FeatureDescriptionSlide"
const layoutDescription = "A slide with a title, description, bullet points, and footer."

const Schema = z.object({
    title: z.string().min(1).max(100).default("特性描述").meta({
        description: "Title of the slide. Max 20 characters",
    }),
    subtitle: z.string().min(0).max(200).default("本页由 FO 填写").meta({
        description: "Subtitle of the slide. Max 40 characters",
    }),
    descriptionText: z.string().min(10).max(500).default("描述该特性 UI 变更情况 (UCD 是否已给出)、参数配置是否需要刷新").meta({
        description: "Main description text of the slide. Max 100 characters",
    }),
    uiChange: z.string().min(0).max(100).default("UI 变更").meta({
        description: "UI change description. Max 20 characters",
    }),
    configChange: z.string().min(0).max(100).default("参数配置").meta({
        description: "Config change description. Max 20 characters",
    }),
    date: z.string().min(0).max(20).default("09/12/2025").meta({
        description: "Footer date of the slide. Max 10 characters",
    }),
    number: z.string().min(0).max(10).default("6").meta({
        description: "Footer number of the slide. Max 5 characters",
    })
})

type FeatureDescriptionSlideData = z.infer<typeof Schema>

interface FeatureDescriptionSlideLayoutProps {
    data?: Partial<FeatureDescriptionSlideData>
}

const dynamicSlideLayout: React.FC<FeatureDescriptionSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="bg-blue-800 text-white p-4 font-bold text-4xl font-微软雅黑">
                {slideData?.title || "特性描述"}
            </div>
            <div className="flex justify-end p-4">
                <div className="bg-blue-200 text-blue-800 p-2 rounded">
                    {slideData?.subtitle || "本页由 FO 填写"}
                </div>
            </div>
            <div className="p-4 text-lg font-微软雅黑">
                {slideData?.descriptionText || "描述该特性 UI 变更情况 (UCD 是否已给出)、参数配置是否需要刷新"}
            </div>
            <ul className="list-disc list-inside p-4 text-lg font-微软雅黑">
                <li>{slideData?.uiChange || "UI 变更"}</li>
            </ul>
            <ul className="list-disc list-inside p-4 text-lg font-微软雅黑">
                <li>{slideData?.configChange || "参数配置"}</li>
            </ul>
            <div className="absolute bottom-0 p-4 text-gray-600 text-sm font-微软雅黑">
                {slideData?.date || "09/12/2025"}
            </div>
            <div className="absolute bottom-0 right-0 p-4 text-gray-600 text-sm font-微软雅黑">
                {slideData?.number || "6"}
            </div>
        </div>
    )
}
