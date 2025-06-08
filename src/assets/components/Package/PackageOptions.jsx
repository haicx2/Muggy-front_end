import React, { useState } from 'react';
import p1 from '../../images/p1.jpg'
import p2 from '../../images/p2.jpg'
import p2_1 from '../../images/p2-1.jpg'
import p1_1 from '../../images/p1-1.jpg'

const packageOptions = [
    {
        id: 'free',
        name: 'Túi cơ bản',
        description: 'Túi đựng thông thường cho sản phẩm của bạn',
        price: 0,
        images: [p1,p1_1] // Add more images to this array
    },
    {
        id: 'premium',
        name: 'Túi cao cấp',
        description: 'Túi cao cấp kèm giấy gói quà sang trọng',
        price: 20000,
        images: [p2,p2_1] // Add more images to this array
    }
];

export default function PackageOptions({ selectedPackage, onPackageSelect }) {
    const [activeImageIndex, setActiveImageIndex] = useState({});
    const [zoomedImage, setZoomedImage] = useState(null);

    const handleImageChange = (packageId, imageIndex) => {
        setActiveImageIndex(prev => ({
            ...prev,
            [packageId]: imageIndex
        }));
    };

    const handleImageZoom = (image, packageName, packageId, imageIndex) => {
        setZoomedImage({ image, packageName, packageId, imageIndex });
    };

    const closeZoom = () => {
        setZoomedImage(null);
    };

    const navigateZoomedImage = (direction) => {
        if (!zoomedImage) return;

        const currentPackage = packageOptions.find(pkg => pkg.id === zoomedImage.packageId);
        if (!currentPackage) return;

        const currentIndex = zoomedImage.imageIndex;
        let newIndex;

        if (direction === 'next') {
            newIndex = currentIndex === currentPackage.images.length - 1 ? 0 : currentIndex + 1;
        } else {
            newIndex = currentIndex === 0 ? currentPackage.images.length - 1 : currentIndex - 1;
        }

        // Update both zoom state and active image index
        setZoomedImage({
            ...zoomedImage,
            image: currentPackage.images[newIndex],
            imageIndex: newIndex
        });

        setActiveImageIndex(prev => ({
            ...prev,
            [zoomedImage.packageId]: newIndex
        }));
    };

    return (
        <div className="mt-4 mb-6">
            <h3 className="text-lg font-medium text-gray-900 mb-3">Chọn túi</h3>
            <div className="space-y-3">
                {packageOptions.map((pkg) => {
                    const currentImageIndex = activeImageIndex[pkg.id] || 0;
                    const currentImage = pkg.images[currentImageIndex];

                    return (
                        <div
                            key={pkg.id}
                            className={`border rounded-lg p-4 cursor-pointer transition-colors ${
                                selectedPackage?.id === pkg.id ? 'border-blue-500 bg-blue-50' : 'border-gray-200 hover:border-gray-300'
                            }`}
                            onClick={() => onPackageSelect(pkg)}
                        >
                            <div className="flex items-center gap-4">
                                <div className="relative">
                                    <img
                                        src={currentImage}
                                        alt={pkg.name}
                                        className="w-16 h-16 object-cover rounded-md cursor-zoom-in"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleImageZoom(currentImage, pkg.name, pkg.id, currentImageIndex);
                                        }}
                                    />
                                    {pkg.images.length > 1 && (
                                        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 flex gap-1">
                                            {pkg.images.map((_, index) => (
                                                <button
                                                    key={index}
                                                    className={`w-2 h-2 rounded-full transition-colors ${
                                                        index === currentImageIndex ? 'bg-blue-500' : 'bg-gray-300'
                                                    }`}
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleImageChange(pkg.id, index);
                                                    }}
                                                />
                                            ))}
                                        </div>
                                    )}
                                </div>
                                <div className="flex-1">
                                    <h4 className="font-medium">{pkg.name}</h4>
                                    <p className="text-sm text-gray-500">{pkg.description}</p>
                                    {pkg.images.length > 1 && (
                                        <p className="text-xs text-gray-400 mt-1">
                                            {currentImageIndex + 1} / {pkg.images.length} ảnh
                                        </p>
                                    )}
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
                    );
                })}
            </div>

            {/* Zoom Modal */}
            {zoomedImage && (
                <div
                    className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50"
                    onClick={closeZoom}
                >
                    <div className="relative max-w-4xl max-h-4xl p-4">
                        <button
                            className="absolute top-2 right-2 text-white bg-black bg-opacity-50 rounded-full w-8 h-8 flex items-center justify-center hover:bg-opacity-75 transition-colors z-10"
                            onClick={closeZoom}
                        >
                            ×
                        </button>

                        {/* Navigation Arrows */}
                        {(() => {
                            const currentPackage = packageOptions.find(pkg => pkg.id === zoomedImage.packageId);
                            return currentPackage && currentPackage.images.length > 1 && (
                                <>
                                    <button
                                        className="absolute left-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigateZoomedImage('prev');
                                        }}
                                    >
                                        ‹
                                    </button>
                                    <button
                                        className="absolute right-2 top-1/2 transform -translate-y-1/2 text-white bg-black bg-opacity-50 rounded-full w-10 h-10 flex items-center justify-center hover:bg-opacity-75 transition-colors z-10"
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            navigateZoomedImage('next');
                                        }}
                                    >
                                        ›
                                    </button>
                                </>
                            );
                        })()}

                        <img
                            src={zoomedImage.image}
                            alt={zoomedImage.packageName}
                            className="max-w-full max-h-full object-contain rounded-lg"
                            onClick={(e) => e.stopPropagation()}
                        />

                        {/* Image Counter and Package Name */}
                        <div className="text-white text-center mt-2">
                            <p className="text-sm font-medium">{zoomedImage.packageName}</p>
                            {(() => {
                                const currentPackage = packageOptions.find(pkg => pkg.id === zoomedImage.packageId);
                                return currentPackage && currentPackage.images.length > 1 && (
                                    <p className="text-xs text-gray-300 mt-1">
                                        {zoomedImage.imageIndex + 1} / {currentPackage.images.length} ảnh
                                    </p>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}