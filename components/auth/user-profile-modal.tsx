"use client"

import { useState } from "react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { User, Mail, Calendar, Trophy, Target, Star, Edit2, Save, X } from "lucide-react"
import { useAuth } from "./auth-provider"

interface UserProfileModalProps {
  isOpen: boolean
  onClose: () => void
}

export function UserProfileModal({ isOpen, onClose }: UserProfileModalProps) {
  const { user, updateProfile } = useAuth()
  const [isEditing, setIsEditing] = useState(false)
  const [editData, setEditData] = useState({
    username: user?.username || "",
    email: user?.email || "",
  })

  if (!user) return null

  const handleSave = async () => {
    await updateProfile(editData)
    setIsEditing(false)
  }

  const handleCancel = () => {
    setEditData({
      username: user.username,
      email: user.email || "",
    })
    setIsEditing(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-2xl bg-card border-border">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <User className="w-5 h-5" />
            User Profile
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Profile Header */}
          <div className="flex items-start gap-4">
            <Avatar className="w-20 h-20">
              <AvatarImage src={user.avatar || "/placeholder.svg"} />
              <AvatarFallback className="text-lg">{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
            </Avatar>

            <div className="flex-1 space-y-2">
              {isEditing ? (
                <div className="space-y-2">
                  <div>
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={editData.username}
                      onChange={(e) => setEditData((prev) => ({ ...prev, username: e.target.value }))}
                    />
                  </div>
                  <div>
                    <Label htmlFor="email">Email (Optional)</Label>
                    <Input
                      id="email"
                      type="email"
                      value={editData.email}
                      onChange={(e) => setEditData((prev) => ({ ...prev, email: e.target.value }))}
                    />
                  </div>
                </div>
              ) : (
                <div>
                  <div className="flex items-center gap-2">
                    <h3 className="text-xl font-bold">{user.username}</h3>
                    {user.verified && (
                      <Badge variant="secondary" className="bg-blue-500/20 text-blue-400">
                        Verified
                      </Badge>
                    )}
                  </div>
                  {user.email && (
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <Mail className="w-3 h-3" />
                      {user.email}
                    </p>
                  )}
                  <p className="text-sm text-muted-foreground flex items-center gap-1">
                    <Calendar className="w-3 h-3" />
                    Joined {new Date(user.joinedAt).toLocaleDateString()}
                  </p>
                </div>
              )}

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-3 h-3 mr-1" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="w-3 h-3 mr-1" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" variant="outline" onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-3 h-3 mr-1" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </div>

          <Separator />

          {/* Stats */}
          <div className="grid grid-cols-3 gap-4">
            <Card className="bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1">
                  <Target className="w-4 h-4" />
                  Total Bids
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold">{user.totalBids}</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1">
                  <Trophy className="w-4 h-4" />
                  Wins
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-primary">{user.totalWins}</div>
              </CardContent>
            </Card>

            <Card className="bg-card/50">
              <CardHeader className="pb-2">
                <CardTitle className="text-sm flex items-center gap-1">
                  <Star className="w-4 h-4" />
                  Reputation
                </CardTitle>
              </CardHeader>
              <CardContent className="pt-0">
                <div className="text-2xl font-bold text-yellow-400">{user.reputation}</div>
              </CardContent>
            </Card>
          </div>

          {/* Wallet Info */}
          <div>
            <h4 className="font-medium mb-2">Connected Wallet</h4>
            <div className="bg-muted p-3 rounded-lg">
              <code className="text-sm">{user.address}</code>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
