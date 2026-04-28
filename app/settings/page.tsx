"use client"

import { useState } from "react"
import { AppShell } from "@/components/layout/AppShell"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { 
  User, 
  Bell, 
  Shield, 
  Palette,
  Globe,
  Save,
  Mail,
  Key,
  Smartphone,
  Eye,
  EyeOff
} from "lucide-react"

export default function SettingsPage() {
  const [showPassword, setShowPassword] = useState(false)
  const [notifications, setNotifications] = useState({
    email: true,
    push: false,
    weeklyReport: true,
    scoreChanges: true,
    newSchools: false,
  })

  return (
    <AppShell>
      <div className="container mx-auto px-4 py-8 max-w-4xl">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-foreground">設定</h1>
          <p className="text-muted-foreground mt-1">管理您的帳戶設定和偏好</p>
        </div>

        {/* Tabs */}
        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="flex items-center gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">個人資料</span>
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="h-4 w-4" />
              <span className="hidden sm:inline">通知</span>
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="h-4 w-4" />
              <span className="hidden sm:inline">安全性</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="flex items-center gap-2">
              <Palette className="h-4 w-4" />
              <span className="hidden sm:inline">偏好設定</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>個人資料</CardTitle>
                <CardDescription>更新您的個人資訊</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Avatar */}
                <div className="flex items-center gap-6">
                  <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
                    <User className="h-10 w-10 text-primary" />
                  </div>
                  <div>
                    <Button variant="outline" size="sm">更換頭像</Button>
                    <p className="text-xs text-muted-foreground mt-2">
                      建議使用 200x200 像素的正方形圖片
                    </p>
                  </div>
                </div>

                {/* Form Fields */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="displayName">顯示名稱</Label>
                    <Input id="displayName" defaultValue="陳大文" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="email">電郵地址</Label>
                    <Input id="email" type="email" defaultValue="user@example.com" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="phone">聯絡電話</Label>
                    <Input id="phone" type="tel" placeholder="+852 XXXX XXXX" />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="role">身份</Label>
                    <Select defaultValue="parent">
                      <SelectTrigger>
                        <SelectValue placeholder="選擇身份" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="parent">家長</SelectItem>
                        <SelectItem value="student">學生</SelectItem>
                        <SelectItem value="teacher">教師</SelectItem>
                        <SelectItem value="researcher">研究員</SelectItem>
                        <SelectItem value="other">其他</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">個人簡介</Label>
                  <textarea
                    id="bio"
                    className="w-full min-h-[100px] px-3 py-2 rounded-md border border-input bg-background text-sm"
                    placeholder="介紹一下自己..."
                  />
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    儲存變更
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Notifications Tab */}
          <TabsContent value="notifications">
            <Card>
              <CardHeader>
                <CardTitle>通知設定</CardTitle>
                <CardDescription>選擇您想接收的通知類型</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Notification Channels */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">通知渠道</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Mail className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">電郵通知</p>
                          <p className="text-sm text-muted-foreground">接收重要更新的電郵</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.email}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, email: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div className="flex items-center gap-3">
                        <Smartphone className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">推送通知</p>
                          <p className="text-sm text-muted-foreground">接收瀏覽器推送通知</p>
                        </div>
                      </div>
                      <Switch
                        checked={notifications.push}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, push: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                {/* Notification Types */}
                <div className="space-y-4">
                  <h3 className="font-medium text-foreground">通知類型</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">每週報告</p>
                        <p className="text-sm text-muted-foreground">每週收到收藏學校的分數變動摘要</p>
                      </div>
                      <Switch
                        checked={notifications.weeklyReport}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, weeklyReport: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">分數變動</p>
                        <p className="text-sm text-muted-foreground">當收藏學校的 SSRI 分數有顯著變動時通知</p>
                      </div>
                      <Switch
                        checked={notifications.scoreChanges}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, scoreChanges: checked }))
                        }
                      />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">新增學校</p>
                        <p className="text-sm text-muted-foreground">當有新學校加入資料庫時通知</p>
                      </div>
                      <Switch
                        checked={notifications.newSchools}
                        onCheckedChange={(checked) => 
                          setNotifications(prev => ({ ...prev, newSchools: checked }))
                        }
                      />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    儲存設定
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Security Tab */}
          <TabsContent value="security">
            <div className="space-y-6">
              <Card>
                <CardHeader>
                  <CardTitle>變更密碼</CardTitle>
                  <CardDescription>定期更新密碼以確保帳戶安全</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="currentPassword">目前密碼</Label>
                    <div className="relative">
                      <Input
                        id="currentPassword"
                        type={showPassword ? "text" : "password"}
                        placeholder="輸入目前密碼"
                      />
                      <Button
                        variant="ghost"
                        size="icon"
                        className="absolute right-0 top-0 h-full"
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                      </Button>
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="newPassword">新密碼</Label>
                    <Input
                      id="newPassword"
                      type="password"
                      placeholder="輸入新密碼"
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="confirmPassword">確認新密碼</Label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      placeholder="再次輸入新密碼"
                    />
                  </div>
                  <Button>
                    <Key className="h-4 w-4 mr-2" />
                    更新密碼
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle>雙重驗證</CardTitle>
                  <CardDescription>增加額外的安全層級</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg border">
                    <div>
                      <p className="font-medium">啟用雙重驗證</p>
                      <p className="text-sm text-muted-foreground">登入時需要輸入驗證碼</p>
                    </div>
                    <Button variant="outline">設定</Button>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="text-destructive">危險區域</CardTitle>
                  <CardDescription>這些操作無法復原，請謹慎操作</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between p-4 rounded-lg border border-destructive/20 bg-destructive/5">
                    <div>
                      <p className="font-medium text-destructive">刪除帳戶</p>
                      <p className="text-sm text-muted-foreground">永久刪除您的帳戶和所有資料</p>
                    </div>
                    <Button variant="destructive">刪除帳戶</Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>偏好設定</CardTitle>
                <CardDescription>自訂您的使用體驗</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                {/* Language */}
                <div className="space-y-2">
                  <Label>語言</Label>
                  <Select defaultValue="zh-hant">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="選擇語言" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="zh-hant">繁體中文</SelectItem>
                      <SelectItem value="zh-hans">簡體中文</SelectItem>
                      <SelectItem value="en">English</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Theme */}
                <div className="space-y-2">
                  <Label>主題</Label>
                  <Select defaultValue="system">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="選擇主題" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="light">淺色模式</SelectItem>
                      <SelectItem value="dark">深色模式</SelectItem>
                      <SelectItem value="system">跟隨系統</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Default View */}
                <div className="space-y-2">
                  <Label>預設搜尋顯示</Label>
                  <Select defaultValue="card">
                    <SelectTrigger className="w-full md:w-[200px]">
                      <SelectValue placeholder="選擇顯示方式" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="card">卡片檢視</SelectItem>
                      <SelectItem value="list">列表檢視</SelectItem>
                      <SelectItem value="map">地圖檢視</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {/* Data Preferences */}
                <div className="space-y-4">
                  <Label>數據偏好</Label>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">顯示信心度</p>
                        <p className="text-sm text-muted-foreground">在分數旁顯示 AI 分析的信心度</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">顯示證據來源</p>
                        <p className="text-sm text-muted-foreground">展開時顯示評分的證據來源</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                    <div className="flex items-center justify-between p-4 rounded-lg border">
                      <div>
                        <p className="font-medium">自動載入更多</p>
                        <p className="text-sm text-muted-foreground">捲動到底部時自動載入更多結果</p>
                      </div>
                      <Switch defaultChecked />
                    </div>
                  </div>
                </div>

                <div className="flex justify-end">
                  <Button>
                    <Save className="h-4 w-4 mr-2" />
                    儲存偏好
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </AppShell>
  )
}
