import React from "react";
import PageLayout from "../../components/PageLayout";

export default function NotReadyPage() {
    return (
        <PageLayout>
            <div
                className="flex justify-center items-center flex-col mt-16"
                style={{ color: "var(--main-color)" }}
            >
                <span>This feature is under construction</span>
                <span>ETA 2023</span>
            </div>
        </PageLayout>
    );
}
