"use client"

import { cn } from "@/lib/utils";
import { LucideIcon } from "lucide-react"
import { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";
import { usePathname, useRouter } from "next/navigation"

type IconTypes = {
    icon: LucideIcon;
    label: string;
    href: string;
}

export default function SidebarItem({ icon: Icon, label, href }: IconTypes) {
    const pathname: string = usePathname()
    const router: AppRouterInstance = useRouter()

    const isActive =
        (pathname === "/" && href === "/") ||
        pathname === href ||
        pathname?.startsWith(`${href}/`)

    const navigate = () => {
        router.push(href)
    }

    return (
        <button
            onClick={navigate}
            className={cn(
                "flex items-center gap-x-2 text-slate-500 text-md font-[500] pl-6 transition-all hover:text-slate-600 hover:bg-slate-300/20",
                isActive && "text-sky-700 bg-sky-200/20 hover:bg-sky-200/20 hover:text-sky-700"
            )}>
            <div className="flex items-center gap-x-2 py-4">
                <Icon
                    size={22}
                    className={cn(
                        "text-slate-500",
                        isActive && "text-sky-700"
                    )}
                />
                {label}
            </div>

            <div
                className={cn(
                    "ml-auto opacity-0 border-2 border-sky-700 h-full transition-all",
                    isActive && "opacity-100"
                )}
            />
        </button>
    )
}
