import React from 'react'
import { z } from 'zod'

const layoutId = "impact-analysis-space-slide"
const layoutName = "Impact Analysis Space"
const layoutDescription = "A slide with a header, two highlighted text sections, and footer information."

const Schema = z.object({
    header: z.string().min(1).max(64).default("周边影响分析 - 空间").meta({
        description: "Header title of the slide"
    }),
    firstSectionText: z.string().min(10).max(256).default("是否会占用过大的内存空间？代码段影响是否受控？是否内存泄露？超过 64K 需要专题说明。").meta({
        description: "First highlighted section text. Max 32 words"
    }),
    secondSectionText: z.string().min(10).max(512).default("是否涉及文件生成、删除、存储路径修改等操作？是否具备空间清理机制？当前代码逻辑是否会产生孤立文件（空间清除机制无法删除的文件）？是否会因文件存储占满导致系统升级包无法下载？请确保涉及此次业务的文件存储不影响版本升级。").meta({
        description: "Second highlighted section text. Max 64 words"
    }),
    footerLeft: z.string().min(1).max(16).default("09/12/2025").meta({
        description: "Left footer content"
    }),
    footerRight: z.string().min(1).max(16).default("12").meta({
        description: "Right footer content"
    })
})

type ImpactAnalysisSpaceSlideData = z.infer<typeof Schema>

interface ImpactAnalysisSpaceSlideLayoutProps {
    data?: Partial<ImpactAnalysisSpaceSlideData>
}

export const dynamicSlideLayout: React.FC<ImpactAnalysisSpaceSlideLayoutProps> = ({ data: slideData }) => {
    return (
        <>
            <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
                <div className="bg-blue-800 text-white p-4 text-4xl font-bold font-微软雅黑">
                    {slideData?.header || "周边影响分析 - 空间"}
                </div>
                <div className="p-4">
                    <div className="bg-blue-200 p-2 rounded">
                        <p className="text-lg font-微软雅黑">
                            {slideData?.firstSectionText || "是否会占用过大的内存空间？代码段影响是否受控？是否内存泄露？超过 64K 需要专题说明。"}
                        </p>
                    </div>
                </div>
                <div className="p-4">
                    <div className="bg-blue-200 p-2 rounded">
                        <p className="text-lg font-微软雅黑">
                            {slideData?.secondSectionText || "是否涉及文件生成、删除、存储路径修改等操作？是否具备空间清理机制？当前代码逻辑是否会产生孤立文件（空间清除机制无法删除的文件）？是否会因文件存储占满导致系统升级包无法下载？请确保涉及此次业务的文件存储不影响版本升级。"}
                        </p>
                    </div>
                </div>
                <div className="absolute bottom-0 left-0 p-4 text-gray-600">
                    {slideData?.footerLeft || "09/12/2025"}
                </div>
                <div className="absolute bottom-0 right-0 p-4 text-gray-600">
                    {slideData?.footerRight || "12"}
                </div>
            </div>
        </>
    )
}

export default dynamicSlideLayout
export { layoutId, layoutName, layoutDescription, Schema }
