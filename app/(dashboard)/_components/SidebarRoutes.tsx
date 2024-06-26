"use client"

import { Compass, Layout, List, BarChart } from "lucide-react"
import SidebarItem from "./SidebarItem"
import { usePathname } from "next/navigation"

const guestRoutes = [
    {
        icon: Layout,
        label: "Dashboard",
        href: "/"
    },
    {
        icon: Compass,
        label: "Browse",
        href: "/search"
    }
]

const teacherRoutes = [
    {
        icon: List,
        label: "Courses",
        href: "/teachers/courses"
    },
    {
        icon: BarChart,
        label: "Analytics",
        href: "/teachers/analytics"
    }
]

export default function SidebarRoutes() {
    const pathname = usePathname()

    const isTeacherPage = pathname?.includes("/teachers")

    const routes = isTeacherPage ? teacherRoutes : guestRoutes

    return (
        <div className="flex flex-col w-full">
            {routes.map((route) => (
                <SidebarItem
                    key={route.href}
                    icon={route.icon}
                    label={route.label}
                    href={route.href}
                />
            ))}
        </div>
    )
}
