"use client"

import Link from "next/link"
import { ArrowLeft, MapPin, Users, Wifi, UtensilsCrossed, Zap, Check, ChevronLeft, ChevronRight, X, Upload, Play, Trash2 } from "lucide-react"
import { useState, useRef } from "react"
import { useLanguage } from "@/lib/language-context"
import { LanguageSwitcher } from "@/components/language-switcher"

export default function ListYourSpacePage() {
  const { t } = useLanguage()
  const fileInputRef = useRef<HTMLInputElement>(null)
  const videoInputRef = useRef<HTMLInputElement>(null)
  const [imageSliderIndex, setImageSliderIndex] = useState(0)
  const [formData, setFormData] = useState({
    spaceName: "",
    location: "",
    description: "",
    price: "",
    maxGuests: "",
    amenities: [] as string[],
    contact: "",
    latitude: 41.7151,
    longitude: 44.7671,
    images: [] as string[],
    videos: [] as string[],
  })
  const [showVideoError, setShowVideoError] = useState(false)

  const amenitiesOptions = [
    { id: "wifi", label: "WiFi", icon: Wifi },
    { id: "kitchen", label: "Kitchen", icon: UtensilsCrossed },
    { id: "heating", label: "Heating", icon: Zap },
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const toggleAmenity = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }))
  }

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          setFormData((prev) => ({
            ...prev,
            images: [...prev.images, result],
          }))
          setImageSliderIndex(formData.images.length)
        }
        reader.readAsDataURL(file)
      })
    }
    if (fileInputRef.current) {
      fileInputRef.current.value = ""
    }
  }

  const handleVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    setShowVideoError(false)
    
    if (formData.images.length === 0) {
      setShowVideoError(true)
      return
    }

    const files = e.target.files
    if (files) {
      Array.from(files).forEach((file) => {
        const reader = new FileReader()
        reader.onload = (event) => {
          const result = event.target?.result as string
          setFormData((prev) => ({
            ...prev,
            videos: [...prev.videos, result],
          }))
        }
        reader.readAsDataURL(file)
      })
    }
    if (videoInputRef.current) {
      videoInputRef.current.value = ""
    }
  }

  const removeImage = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      images: prev.images.filter((_, i) => i !== index),
    }))
    if (imageSliderIndex >= formData.images.length - 1 && imageSliderIndex > 0) {
      setImageSliderIndex(imageSliderIndex - 1)
    }
  }

  const removeVideo = (index: number) => {
    setFormData((prev) => ({
      ...prev,
      videos: prev.videos.filter((_, i) => i !== index),
    }))
  }

  const nextImage = () => {
    setImageSliderIndex((prev) => (prev + 1) % formData.images.length)
  }

  const prevImage = () => {
    setImageSliderIndex((prev) => (prev - 1 + formData.images.length) % formData.images.length)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    console.log("Form submitted:", formData)
    alert(t.listYourSpaceForm.successMessage)
    setFormData({
      spaceName: "",
      location: "",
      description: "",
      price: "",
      maxGuests: "",
      amenities: [],
      contact: "",
      latitude: 41.7151,
      longitude: 44.7671,
      images: [],
      videos: [],
    })
    setImageSliderIndex(0)
  }

  const mapUrl = `https://www.google.com/maps/embed/v1/place?key=AIzaSyBFw0Qbyq9zTFTd-tUY6dUzKydaZ5yXMFw&q=${formData.latitude},${formData.longitude}`

  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      {/* Enhanced background decoration with multiple gradient layers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 md:w-[500px] h-96 md:h-[500px] bg-gradient-to-br from-apple-blue/20 md:from-apple-blue/15 via-apple-blue/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute bottom-20 left-0 w-80 md:w-96 h-80 md:h-96 bg-gradient-to-br from-apple-green/15 md:from-apple-green/10 via-apple-green/5 to-transparent rounded-full blur-3xl" />
        <div className="absolute top-1/3 left-1/3 w-64 md:w-80 h-64 md:h-80 bg-gradient-to-br from-apple-yellow/10 to-transparent rounded-full blur-3xl" />
      </div>

      <div className="max-w-4xl mx-auto px-6 py-8 relative z-10">
        {/* Top Bar with Back Button and Language Switcher */}
        <div className="flex items-center justify-between mb-8 animate-fade-up">
          <Link
            href="/"
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-foreground text-background hover:shadow-lg hover:scale-105 transition-all duration-300 font-semibold hover:bg-foreground/90"
          >
            <ArrowLeft className="w-5 h-5" />
            Back
          </Link>
          <LanguageSwitcher variant="light" />
        </div>

        {/* Header */}
        <div className="mb-12 animate-fade-up">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
            {t.listYourSpaceForm.title}
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl">
            {t.listYourSpaceForm.subtitle}
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Basic Information */}
          <div className="space-y-6 p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 group animate-fade-up">
            <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
              {t.listYourSpaceForm.basicInfo}
            </h2>

            <div className="space-y-2">
              <label htmlFor="spaceName" className="block text-foreground font-semibold">
                {t.listYourSpaceForm.spaceName}
              </label>
              <input
                type="text"
                id="spaceName"
                name="spaceName"
                value={formData.spaceName}
                onChange={handleChange}
                placeholder={t.listYourSpaceForm.spaceNamePlaceholder}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:border-accent/30"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="location" className="block text-foreground font-semibold">
                {t.listYourSpaceForm.location}
              </label>
              <input
                type="text"
                id="location"
                name="location"
                value={formData.location}
                onChange={handleChange}
                placeholder={t.listYourSpaceForm.locationPlaceholder}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:border-accent/30"
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="block text-foreground font-semibold">
                {t.listYourSpaceForm.description}
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleChange}
                placeholder={t.listYourSpaceForm.descriptionPlaceholder}
                required
                rows={5}
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:border-accent/30"
              />
            </div>
          </div>

          {/* Images Upload */}
          <div className="space-y-6 p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 group animate-fade-up">
            <div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                {t.listYourSpaceForm.photos}
              </h2>
              <p className="text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{t.listYourSpaceForm.photosSubtitle}</p>
            </div>

            {/* Image Preview Slider */}
            {formData.images.length > 0 && (
              <div className="space-y-4">
                <div className="relative aspect-[4/3] overflow-hidden rounded-2xl bg-muted border border-border shadow-lg group/image hover:shadow-xl transition-all duration-300">
                  <img
                    src={formData.images[imageSliderIndex]}
                    alt={`Space image ${imageSliderIndex + 1}`}
                    className="w-full h-full object-cover group-hover/image:scale-105 transition-transform duration-500"
                  />

                  {/* Remove button */}
                  <button
                    type="button"
                    onClick={() => removeImage(imageSliderIndex)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110 z-10"
                  >
                    <X className="w-5 h-5" />
                  </button>

                  {/* Navigation arrows */}
                  {formData.images.length > 1 && (
                    <>
                      <button
                        type="button"
                        onClick={prevImage}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110 z-10"
                      >
                        <ChevronLeft className="w-6 h-6" />
                      </button>
                      <button
                        type="button"
                        onClick={nextImage}
                        className="absolute right-4 top-1/2 -translate-y-1/2 p-3 rounded-full bg-black/50 hover:bg-black/70 text-white transition-all duration-300 hover:scale-110 z-10"
                      >
                        <ChevronRight className="w-6 h-6" />
                      </button>
                    </>
                  )}
                </div>

                {/* Image counter and thumbnails */}
                <div className="space-y-3">
                  <div className="flex items-center justify-between">
                    <p className="text-sm text-muted-foreground font-semibold">
                      {t.listYourSpaceForm.imageCounter.replace("{current}", (imageSliderIndex + 1).toString()).replace("{total}", formData.images.length.toString())}
                    </p>
                  </div>

                  {/* Thumbnail strip */}
                  <div className="flex gap-2 overflow-x-auto pb-2">
                    {formData.images.map((image, index) => (
                      <button
                        key={index}
                        type="button"
                        onClick={() => setImageSliderIndex(index)}
                        className={`flex-shrink-0 w-16 h-16 rounded-lg overflow-hidden border-2 transition-all hover:scale-105 ${
                          imageSliderIndex === index ? "border-accent shadow-md" : "border-border opacity-60 hover:opacity-100"
                        }`}
                      >
                        <img src={image} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                      </button>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* Upload button */}
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="w-full py-4 px-6 rounded-2xl border-2 border-dashed border-border hover:border-accent/50 hover:bg-accent/5 transition-all duration-300 flex items-center justify-center gap-3 text-muted-foreground hover:text-accent group/upload"
            >
              <Upload className="w-6 h-6 group-hover/upload:scale-110 transition-transform" />
              <span className="font-semibold">{t.listYourSpaceForm.uploadPhotos}</span>
            </button>

            <input
              ref={fileInputRef}
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageUpload}
              className="hidden"
            />

            {formData.images.length > 0 && (
              <p className="text-sm text-muted-foreground font-medium">
                {formData.images.length === 1 
                  ? t.listYourSpaceForm.photosUploaded.replace("{count}", "1")
                  : t.listYourSpaceForm.photosUploaded_plural.replace("{count}", formData.images.length.toString())}
              </p>
            )}
          </div>

          {/* Videos Upload */}
          <div className="space-y-6 p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 group animate-fade-up">
            <div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                {t.listYourSpaceForm.videos}
              </h2>
              <p className="text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{t.listYourSpaceForm.videosSubtitle}</p>
            </div>

            {/* Video requirement error */}
            {showVideoError && (
              <div className="p-4 rounded-lg bg-apple-red/10 border border-apple-red/30 flex items-start gap-3">
                <div className="p-1.5 rounded-full bg-apple-red/20 flex-shrink-0 mt-0.5">
                  <X className="w-4 h-4 text-apple-red" />
                </div>
                <p className="text-sm font-medium text-apple-red">{t.listYourSpaceForm.videoRequirement}</p>
              </div>
            )}

            {/* Video list */}
            {formData.videos.length > 0 && (
              <div className="space-y-3">
                <p className="text-sm text-muted-foreground font-semibold">{formData.videos.length} video{formData.videos.length !== 1 ? "s" : ""} uploaded</p>
                <div className="space-y-2">
                  {formData.videos.map((_, index) => (
                    <div key={index} className="flex items-center gap-3 p-3 rounded-lg bg-background/40 border border-border/30 hover:border-accent/40 transition-all duration-300 group/video">
                      <div className="p-2 rounded-lg bg-accent/10 group-hover/video:bg-accent/20 transition-colors">
                        <Play className="w-4 h-4 text-accent" />
                      </div>
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-foreground truncate">Video {index + 1}</p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeVideo(index)}
                        className="p-1.5 rounded-lg hover:bg-apple-red/10 text-apple-red hover:scale-110 transition-all duration-300"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Upload button - disabled if no images */}
            <button
              type="button"
              onClick={() => {
                if (formData.images.length === 0) {
                  setShowVideoError(true)
                  return
                }
                videoInputRef.current?.click()
              }}
              disabled={formData.images.length === 0}
              className={`w-full py-4 px-6 rounded-2xl border-2 border-dashed transition-all duration-300 flex items-center justify-center gap-3 font-semibold group/upload ${
                formData.images.length === 0
                  ? 'border-border/30 text-muted-foreground/50 cursor-not-allowed opacity-50'
                  : 'border-border hover:border-accent/50 hover:bg-accent/5 text-muted-foreground hover:text-accent'
              }`}
            >
              <Upload className="w-6 h-6 group-hover/upload:scale-110 transition-transform" />
              <span>{t.listYourSpaceForm.uploadVideos}</span>
            </button>

            <input
              ref={videoInputRef}
              type="file"
              multiple
              accept="video/*"
              onChange={handleVideoUpload}
              disabled={formData.images.length === 0}
              className="hidden"
            />
          </div>

          {/* Pricing & Capacity */}
          <div className="space-y-6 p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 group animate-fade-up">
            <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
              {t.listYourSpaceForm.pricingCapacity}
            </h2>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label htmlFor="price" className="block text-foreground font-semibold">
                  {t.listYourSpaceForm.pricePerNight}
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleChange}
                  placeholder={t.listYourSpaceForm.pricePerNightPlaceholder}
                  required
                  min="0"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:border-accent/30"
                />
              </div>

              <div className="space-y-2">
                <label htmlFor="maxGuests" className="block text-foreground font-semibold">
                  {t.listYourSpaceForm.maxGuests}
                </label>
                <input
                  type="number"
                  id="maxGuests"
                  name="maxGuests"
                  value={formData.maxGuests}
                  onChange={handleChange}
                  placeholder={t.listYourSpaceForm.maxGuestsPlaceholder}
                  required
                  min="1"
                  className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:border-accent/30"
                />
              </div>
            </div>
          </div>

          {/* Location Map */}
          <div className="space-y-6 p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 group animate-fade-up">
            <div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                {t.listYourSpaceForm.locationMap}
              </h2>
              <p className="text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{t.listYourSpaceForm.locationMapSubtitle}</p>
            </div>

            <div className="w-full h-80 rounded-2xl border border-border/30 overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300 group/map">
              <iframe
                width="100%"
                height="100%"
                style={{ border: 0 }}
                loading="lazy"
                allowFullScreen
                src={mapUrl}
              />
            </div>
            <p className="text-sm text-muted-foreground font-medium">
              <span className="font-semibold">{t.listYourSpaceForm.coordinates}:</span> {formData.latitude.toFixed(4)}, {formData.longitude.toFixed(4)}
            </p>
          </div>

          {/* Amenities */}
          <div className="space-y-6 p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 group animate-fade-up">
            <div>
              <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300 mb-2">
                {t.listYourSpaceForm.amenities}
              </h2>
              <p className="text-muted-foreground group-hover:text-foreground/70 transition-colors duration-300">{t.listYourSpaceForm.amenitiesSubtitle}</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              {amenitiesOptions.map((amenity) => {
                const IconComponent = amenity.icon
                const isSelected = formData.amenities.includes(amenity.id)

                return (
                  <button
                    key={amenity.id}
                    type="button"
                    onClick={() => toggleAmenity(amenity.id)}
                    className={`p-5 rounded-2xl border-2 transition-all duration-300 group/amenity hover:shadow-md ${
                      isSelected
                        ? "border-accent bg-gradient-to-br from-accent/10 to-accent/5 text-accent shadow-md"
                        : "border-border/40 bg-background/40 hover:bg-accent/5 text-muted-foreground hover:border-accent/40 hover:text-foreground"
                    }`}
                  >
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-lg transition-all duration-300 ${
                        isSelected 
                          ? 'bg-accent/20 group-hover/amenity:scale-110' 
                          : 'bg-accent/10 group-hover/amenity:bg-accent/20 group-hover/amenity:scale-110'
                      }`}>
                        <IconComponent className="w-5 h-5" />
                      </div>
                      <span className="font-semibold">{amenity.label}</span>
                      {isSelected && <Check className="w-5 h-5 ml-auto text-accent scale-110" />}
                    </div>
                  </button>
                )
              })}
            </div>
          </div>

          {/* Contact Information */}
          <div className="space-y-6 p-8 rounded-[28px] bg-gradient-to-br from-card to-secondary border border-border/40 shadow-lg hover:shadow-xl transition-all duration-500 group animate-fade-up">
            <h2 className="text-2xl font-bold text-foreground group-hover:text-accent transition-colors duration-300">
              {t.listYourSpaceForm.contact}
            </h2>

            <div className="space-y-2">
              <label htmlFor="contact" className="block text-foreground font-semibold">
                {t.listYourSpaceForm.emailOrPhone}
              </label>
              <input
                type="text"
                id="contact"
                name="contact"
                value={formData.contact}
                onChange={handleChange}
                placeholder={t.listYourSpaceForm.emailOrPhonePlaceholder}
                required
                className="w-full px-4 py-3 rounded-xl border border-border bg-background text-foreground placeholder-muted-foreground focus:outline-none focus:ring-2 focus:ring-accent/50 transition-all duration-300 hover:border-accent/30"
              />
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4 pt-8 pb-12 animate-fade-up">
            <button
              type="submit"
              className="flex-1 py-4 px-6 rounded-2xl bg-gradient-to-r from-accent to-blue-600 text-white font-bold text-lg cursor-pointer hover:shadow-lg hover:scale-105 transition-all duration-300 shadow-lg"
            >
              {t.listYourSpaceForm.submitButton}
            </button>
            <button
              type="button"
              onClick={() =>
                setFormData({
                  spaceName: "",
                  location: "",
                  description: "",
                  price: "",
                  maxGuests: "",
                  amenities: [],
                  contact: "",
                  latitude: 41.7151,
                  longitude: 44.7671,
                  images: [],
                  videos: [],
                })
              }
              className="py-4 px-6 rounded-2xl border-2 border-border text-foreground font-semibold cursor-pointer hover:bg-foreground hover:text-background hover:border-foreground transition-all duration-300 group/clear"
            >
              {t.listYourSpaceForm.clearButton}
            </button>
          </div>
        </form>
      </div>
    </main>
  )
}
