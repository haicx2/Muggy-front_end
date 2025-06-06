import React from 'react';
import p1 from '../../images/package1.jpg'
import p2 from '../../images/package2.jpg'

const packageOptions = [
    {
        id: 'free',
        name: 'Túi cơ bản',
        description: 'Túi đựng thông thường cho sản phẩm của bạn',
        price: 0,
        image: p1 // Sample basic packaging image
    },
    {
        id: 'premium',
        name: 'Túi cao cấp',
        description: 'Túi cao cấp kèm giấy gói quà sang trọng',
        price: 20000,
        image: p2 // Sample premium packaging image
    }
];

export default function PackageOptions({ selectedPackage, onPackageSelect }) {
    return (
        <div className="mt-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Chọn túi</h3>
            <div className="space-y-3">
                {packageOptions.map((pkg) => (
                    <div
                        key={pkg.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                            selectedPackage?.id === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                        }`}
                        onClick={() => onPackageSelect(pkg)}
                    >
                        <div className="flex items-center gap-4">
                            <img
                                src={pkg.image}
                                alt={pkg.name}
                                className="w-16 h-16 object-cover rounded-md"
                            />
                            <div className="flex-1">
                                <h4 className="font-medium">{pkg.name}</h4>
                                <p className="text-sm text-gray-500">{pkg.description}</p>
                            </div>
                            <div className="text-right">
                                {pkg.price === 0 ? (
                                    <span className="text-green-600 font-medium">Miễn phí</span>
                                ) : (
                                    <span className="text-pink-500 font-medium">{pkg.price.toLocaleString()} VND</span>
                                )}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}