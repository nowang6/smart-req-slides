import React from 'react'
import { z } from 'zod'

const layoutId = "signature-table-slide"
const layoutName = "SignatureTable"
const layoutDescription = "A slide with a table for signatures by role."

const Schema = z.object({
    roles: z.array(z.object({
        name: z.string().min(2).max(20).default("特性开发负责人").meta({
            description: "Role name. Max 20 characters",
        }),
        personName: z.string().min(0).max(20).default("").meta({
            description: "Person's name associated with the role. Max 20 characters",
        }),
        opinion: z.string().min(0).max(100).default("").meta({
            description: "Opinion or notes by the person. Max 100 characters",
        }),
        notes: z.string().min(0).max(100).default("").meta({
            description: "Additional notes. Max 100 characters",
        })
    })).min(1).max(7).default([
        { name: "特性开发负责人", personName: "", opinion: "", notes: "" },
        { name: "特性设计负责人", personName: "", opinion: "", notes: "" },
        { name: "特性测试负责人", personName: "", opinion: "", notes: "" },
        { name: "版本与升级", personName: "", opinion: "", notes: "" },
        { name: "性能", personName: "", opinion: "", notes: "" },
        { name: "维服", personName: "", opinion: "", notes: "" },
        { name: "资料", personName: "", opinion: "", notes: "" }
    ]).meta({
        description: "List of roles with associated person names, opinions and notes"
    })
})

type SignatureTableSlideData = z.infer<typeof Schema>

interface SignatureTableSlideLayoutProps {
    data?: Partial<SignatureTableSlideData>
}

export const dynamicSlideLayout: React.FC<SignatureTableSlideLayoutProps> = ({ data: slideData }) => {
    const roles = slideData?.roles || []

    return (
        <div className="relative w-full rounded-sm max-w-[1280px] shadow-lg max-h-[720px] aspect-video bg-white relative z-20 mx-auto overflow-hidden">
            <div className="p-4 font-['Microsoft YaHei']">
                <h1 className="text-4xl font-bold mb-4">会签</h1>
                <table className="w-full border-collapse">
                    <thead>
                        <tr className="bg-blue-200 text-black">
                            <th className="px-4 py-2">角色</th>
                            <th className="px-4 py-2">姓名</th>
                            <th className="px-4 py-2">意见</th>
                            <th className="px-4 py-2">备注</th>
                        </tr>
                    </thead>
                    <tbody>
                        {roles.map((role, index) => (
                            <tr key={index}>
                                <td className="border px-4 py-2">{role.name}</td>
                                <td className="border px-4 py-2">{role.personName}</td>
                                <td className="border px-4 py-2">{role.opinion}</td>
                                <td className="border px-4 py-2">{role.notes}</td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export default dynamicSlideLayout
export { layoutId, layoutName, layoutDescription, Schema }
