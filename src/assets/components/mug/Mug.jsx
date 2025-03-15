import MugSearch from "./MugSearch.jsx";
import MugList from "./MugList.jsx";

export default function Mug() {
    return (
        <div className="min-h-screen bg-gray-50 pt-24 pb-12">
            <div className="container mx-auto px-4">
                <div className="mb-8">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">Our Collection</h1>
                    <p className="text-gray-600">Discover our handpicked selection of beautiful mugs</p>
                </div>
                <MugSearch />
                <MugList />
            </div>
        </div>
    );
}