import React from 'react'
import { z } from 'zod'

const layoutId = "document-clarification-slide"
const layoutName = "DocumentClarificationSlide"
const layoutDescription = "A slide layout for displaying document clarification details."

const Schema = z.object({
    title: z.string().min(1).max(50).default("文档澄清").meta({
        description: "Title of the slide"
    }),
    subheading: z.string().min(1).max(50).default("本页由 FO 填写").meta({
        description: "Subheading of the slide"
    }),
    description: z.string().min(1).max(200).default("和 Story 相关的文档、资料的准备情况：").meta({
        description: "Description for the slide"
    }),
    documents: z.array(z.object({
        number: z.string().min(1).max(10).default("1").meta({
            description: "Document number"
        }),
        name: z.string().min(1).max(100).default("").meta({
            description: "Document name"
        }),
        path: z.string().min(1).max(200).default("").meta({
            description: "Document path"
        })
    })).min(1).max(10).default([
        { number: "1", name: "", path: "" },
        { number: "2", name: "", path: "" },
        { number: "3", name: "", path: "" }
    ]).meta({
        description: "List of documents"
    }),
    dateString: z.string().min(1).max(20).default("09/12/2025").meta({
        description: "Date displayed on the slide"
    }),
    slideNumber: z.string().min(1).max(10).default("9").meta({
        description: "Slide number"
    })
})

type DocumentClarificationSlideData = z.infer<typeof Schema>

interface DocumentClarificationSlideLayoutProps {
    data?: Partial<DocumentClarificationSlideData>
}

const dynamicSlideLayout: React.FC<DocumentClarificationSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="bg-blue-800 text-white text-[56px] font-[微软雅黑] leading-[64px] p-4">
                {slideData?.title || "文档澄清"}
            </div>
            <div className="bg-blue-200 text-blue-800 text-[16px] font-[微软雅黑] leading-[24px] p-2 m-2 rounded">
                {slideData?.subheading || "本页由 FO 填写"}
            </div>
            <div className="text-[24px] font-[微软雅黑] leading-[32px] mt-10 ml-10">
                {slideData?.description || "和 Story 相关的文档、资料的准备情况："}
            </div>
            <div className="bg-gray-200 rounded overflow-hidden mt-4 ml-10 mr-10">
                <table className="w-full bg-white">
                    <thead>
                        <tr className="text-[16px] font-[微软雅黑] leading-[24px] text-left text-gray-800">
                            <th className="px-4 py-2 w-1/6">序号</th>
                            <th className="px-4 py-2 w-2/6">文档 / 资料名称</th>
                            <th className="px-4 py-2 w-3/6">归档路径</th>
                        </tr>
                    </thead>
                    <tbody>
                        {slideData?.documents?.map((doc: any, index: number) => (
                            <tr key={index} className="text-[16px] font-[微软雅黑] leading-[24px] text-left text-gray-800">
                                <td className="px-4 py-2 w-1/6">{doc?.number || (index + 1).toString()}</td>
                                <td className="px-4 py-2 w-2/6">{doc?.name || ""}</td>
                                <td className="px-4 py-2 w-3/6">{doc?.path || ""}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <div className="text-gray-600 text-[14px] font-[微软雅黑] leading-[20px] absolute bottom-10 left-10">
                {slideData?.dateString || "09/12/2025"}
            </div>
            <div className="text-gray-600 text-[14px] font-[微软雅黑] leading-[20px] absolute bottom-10 right-10">
                {slideData?.slideNumber || "9"}
            </div>
        </div>
    )
}

