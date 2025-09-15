import React from 'react'
import { z } from 'zod'

const layoutId = "development-overview-slide"
const layoutName = "DynamicSlideLayout"
const layoutDescription = "A slide displaying a table of development details."

const Schema = z.object({
    title: z.string().min(1).max(100).default("开发概要").meta({
        description: "Title of the slide. Max 100 characters",
    }),
    items: z.array(z.object({
        featureName: z.string().min(1).max(50).meta({
            description: "Feature name. Max 50 characters",
        }),
        codeScale: z.string().min(1).max(50).meta({
            description: "Code scale or responsible party. Max 50 characters",
        }),
    })).min(1).max(6).default([
        { featureName: "完整团队", codeScale: "负责 PL" },
        { featureName: "需求澄清时间", codeScale: "责任人" },
        { featureName: "Coding 结束时间", codeScale: "责任人" },
        { featureName: "DT 结束时间", codeScale: "责任人" },
        { featureName: "完整团队 BBT 结束时间", codeScale: "责任人" },
        { featureName: "交付时间", codeScale: "责任人" }
    ]).meta({
        description: "Array of development items with feature names and code scales. Max 6 items",
    }),
    footerLeftContent: z.string().min(1).max(20).default("09/12/2025").meta({
        description: "Content for the left footer. Max 20 characters",
    }),
    footerRightContent: z.string().min(1).max(10).default("3").meta({
        description: "Content for the right footer. Max 10 characters",
    }),
})

type DevelopmentOverviewSlideData = z.infer<typeof Schema>

interface DevelopmentOverviewSlideLayoutProps {
    data?: Partial<DevelopmentOverviewSlideData>
}

const dynamicSlideLayout: React.FC<DevelopmentOverviewSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white z-20 mx-auto overflow-hidden">
            <div className="bg-blue-800 text-white p-4 font-['Microsoft YaHei']">
                <h1 className="text-4xl">{slideData?.title || "开发概要"}</h1>
                <div className="text-right"><button className="bg-blue-200 text-blue-800 px-4 py-2 mt-2 rounded">本页由 FO 填写</button></div>
            </div>
            <table className="w-full mt-4 bg-gray-100 table-auto border-collapse">
                <thead>
                    <tr className="bg-gray-300">
                        <th className="px-4 py-2">特性名称</th>
                        <th className="px-4 py-2">代码规模</th>
                    </tr>
                </thead>
                <tbody>
                    {slideData?.items?.map((item, index) => (
                        <tr key={index}>
                            <td className="px-4 py-2">{item.featureName}</td>
                            <td className="px-4 py-2">{item.codeScale}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
            <div className="absolute bottom-0 left-0 p-4">
                <p className="font-['Microsoft YaHei'] text-gray-600">{slideData?.footerLeftContent || "09/12/2025"}</p>
            </div>
            <div className="absolute bottom-0 right-0 p-4">
                <p className="font-['Microsoft YaHei'] text-gray-600">{slideData?.footerRightContent || "3"}</p>
            </div>
        </div>
    )
}

export default dynamicSlideLayout
export { Schema, layoutId, layoutName, layoutDescription }