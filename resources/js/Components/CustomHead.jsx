import { Head } from "@inertiajs/react";

export default function CustomHead({ title }) {
    return (
        <Head title={title}>
            <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
        </Head>
    );
}
