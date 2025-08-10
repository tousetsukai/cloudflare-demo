"use client"

import { use } from "react";

export default function Page({
    params,
}: { params: Promise<{ username: string }> }) {
    const {username} = use(params);
    return (
        <h1>Hello, {username}!</h1>
    );
}
