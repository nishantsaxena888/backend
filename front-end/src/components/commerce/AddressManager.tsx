import { useState, useEffect } from 'react';
import { MapPin, Plus, Edit2, Trash2, Home, Building2, X, Check } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useLanguage } from '@/components/language-provider';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue
} from "@/components/ui/select";
import {
    Card,
    CardContent,
    CardHeader,
    CardTitle
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Checkbox } from "@/components/ui/checkbox";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";

export interface Address {
    id: string;
    fullName: string;
    phone: string;
    address: string;
    city: string;
    state: string;
    zipCode: string;
    country: string;
    type: 'home' | 'work' | 'other';
    isDefault: boolean;
}

interface AddressManagerProps {
    onSelectAddress?: (address: Address) => void;
    selectedAddressId?: string;
    mode?: 'manage' | 'select';
}

export function AddressManager({ onSelectAddress, selectedAddressId, mode = 'manage' }: AddressManagerProps) {
    const { t } = useLanguage();
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [showForm, setShowForm] = useState(false);
    const [editingAddress, setEditingAddress] = useState<Address | null>(null);
    const [formData, setFormData] = useState<Omit<Address, 'id'>>({
        fullName: '',
        phone: '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        country: 'United States',
        type: 'home',
        isDefault: false,
    });

    useEffect(() => {
        const savedAddresses = localStorage.getItem('shippingAddresses');
        if (savedAddresses) {
            setAddresses(JSON.parse(savedAddresses));
        }
    }, []);

    const saveAddresses = (newAddresses: Address[]) => {
        localStorage.setItem('shippingAddresses', JSON.stringify(newAddresses));
        setAddresses(newAddresses);
        window.dispatchEvent(new CustomEvent('addressesUpdated'));
    };

    const handleAddAddress = (e: React.FormEvent) => {
        e.preventDefault();
        let newAddresses: Address[];

        if (editingAddress) {
            newAddresses = addresses.map(addr =>
                addr.id === editingAddress.id
                    ? { ...formData, id: editingAddress.id }
                    : formData.isDefault ? { ...addr, isDefault: false } : addr
            );
        } else {
            const newAddress: Address = {
                ...formData,
                id: Date.now().toString(),
            };
            newAddresses = formData.isDefault
                ? [...addresses.map(addr => ({ ...addr, isDefault: false })), newAddress]
                : [...addresses, newAddress];
        }

        saveAddresses(newAddresses);
        resetForm();
    };

    const handleEditAddress = (address: Address) => {
        setEditingAddress(address);
        setFormData(address);
        setShowForm(true);
    };

    const handleDeleteAddress = (id: string) => {
        const newAddresses = addresses.filter(addr => addr.id !== id);
        saveAddresses(newAddresses);
    };

    const resetForm = () => {
        setShowForm(false);
        setEditingAddress(null);
        setFormData({
            fullName: '',
            phone: '',
            address: '',
            city: '',
            state: '',
            zipCode: '',
            country: 'United States',
            type: 'home',
            isDefault: false,
        });
    };

    const getAddressIcon = (type: string) => {
        switch (type) {
            case 'home': return <Home className="w-4 h-4" />;
            case 'work': return <Building2 className="w-4 h-4" />;
            default: return <MapPin className="w-4 h-4" />;
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center text-primary">
                        <MapPin className="w-5 h-5" />
                    </div>
                    <div>
                        <h3 className="text-lg font-bold tracking-tight">
                            {mode === 'select' ? t('address.delivery_title') : t('address.saved_title')}
                        </h3>
                        <p className="text-xs text-muted-foreground">{t('address.manage_msg')}</p>
                    </div>
                </div>
                {!showForm && (
                    <Button onClick={() => setShowForm(true)} size="sm" className="rounded-full gap-2 shadow-lg shadow-primary/20">
                        <Plus className="w-4 h-4" />
                        {t('address.add_new')}
                    </Button>
                )}
            </div>

            {showForm && (
                <Card className="border-2 border-primary/20 shadow-xl overflow-hidden bg-muted/30">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                        <CardTitle className="text-base font-bold">
                            {editingAddress ? t('address.update_details') : t('address.new_destination')}
                        </CardTitle>
                        <Button variant="ghost" size="icon" onClick={resetForm} className="h-8 w-8 rounded-full">
                            <X className="w-4 h-4" />
                        </Button>
                    </CardHeader>
                    <CardContent>
                        <form onSubmit={handleAddAddress} className="space-y-4">
                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('address.full_name')}</Label>
                                    <Input
                                        required
                                        value={formData.fullName}
                                        onChange={e => setFormData({ ...formData, fullName: e.target.value })}
                                        className="bg-background rounded-xl h-11"
                                    />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('address.phone')}</Label>
                                    <Input
                                        required
                                        type="tel"
                                        value={formData.phone}
                                        onChange={e => setFormData({ ...formData, phone: e.target.value })}
                                        className="bg-background rounded-xl h-11"
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('address.street')}</Label>
                                <Input
                                    required
                                    value={formData.address}
                                    onChange={e => setFormData({ ...formData, address: e.target.value })}
                                    className="bg-background rounded-xl h-11"
                                />
                            </div>

                            <div className="grid md:grid-cols-3 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('address.city')}</Label>
                                    <Input required value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="bg-background rounded-xl h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('address.state')}</Label>
                                    <Input required value={formData.state} onChange={e => setFormData({ ...formData, state: e.target.value })} className="bg-background rounded-xl h-11" />
                                </div>
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('address.zip')}</Label>
                                    <Input required value={formData.zipCode} onChange={e => setFormData({ ...formData, zipCode: e.target.value })} className="bg-background rounded-xl h-11" />
                                </div>
                            </div>

                            <div className="grid md:grid-cols-2 gap-4">
                                <div className="space-y-2">
                                    <Label className="text-xs font-bold uppercase tracking-wider text-muted-foreground">{t('address.type')}</Label>
                                    <Select value={formData.type} onValueChange={(val: any) => setFormData({ ...formData, type: val })}>
                                        <SelectTrigger className="bg-background rounded-xl h-11">
                                            <SelectValue />
                                        </SelectTrigger>
                                        <SelectContent>
                                            <SelectItem value="home">{t('address.type_home')}</SelectItem>
                                            <SelectItem value="work">{t('address.type_work')}</SelectItem>
                                            <SelectItem value="other">{t('address.type_other')}</SelectItem>
                                        </SelectContent>
                                    </Select>
                                </div>
                                <div className="flex items-center gap-2 pt-8">
                                    <Checkbox
                                        id="default"
                                        checked={formData.isDefault}
                                        onCheckedChange={(checked) => setFormData({ ...formData, isDefault: !!checked })}
                                    />
                                    <Label htmlFor="default" className="text-sm font-medium">{t('address.use_default')}</Label>
                                </div>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <Button type="submit" className="flex-1 h-11 font-bold rounded-xl">{editingAddress ? t('address.update') : t('address.save')}</Button>
                                <Button type="button" variant="outline" onClick={resetForm} className="h-11 rounded-xl">{t('address.cancel')}</Button>
                            </div>
                        </form>
                    </CardContent>
                </Card>
            )}

            {!showForm && (
                <div className="grid gap-3">
                    {addresses.length === 0 ? (
                        <div className="text-center py-10 border-2 border-dashed rounded-3xl bg-muted/20">
                            <MapPin className="w-12 h-12 text-muted-foreground/30 mx-auto mb-3" />
                            <p className="text-sm font-medium text-muted-foreground">{t('address.empty_msg')}</p>
                        </div>
                    ) : (
                        <RadioGroup
                            value={selectedAddressId}
                            onValueChange={id => onSelectAddress?.(addresses.find(a => a.id === id)!)}
                            className="grid gap-3"
                        >
                            {[...addresses].sort((a) => (a.isDefault ? -1 : 1)).map((address) => (
                                <Label
                                    key={address.id}
                                    htmlFor={address.id}
                                    className={`relative flex items-start gap-4 p-5 rounded-3xl border-2 transition-all cursor-pointer bg-card group ${selectedAddressId === address.id
                                        ? 'border-primary shadow-lg shadow-primary/5 bg-primary/5'
                                        : 'border-border hover:border-primary/40'
                                        }`}
                                >
                                    {mode === 'select' && (
                                        <RadioGroupItem value={address.id} id={address.id} className="mt-1" />
                                    )}

                                    <div className="flex-1 space-y-1">
                                        <div className="flex items-center gap-2">
                                            <div className={`p-2 rounded-xl ${selectedAddressId === address.id ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground group-hover:bg-primary/10 group-hover:text-primary transition-colors'}`}>
                                                {getAddressIcon(address.type)}
                                            </div>
                                            <span className="font-bold tracking-tight text-foreground capitalize">{address.type}</span>
                                            {address.isDefault && (
                                                <Badge variant="secondary" className="text-[9px] uppercase font-black px-1.5 h-4 bg-primary/20 text-primary border-none">
                                                    {t('address.default_badge')}
                                                </Badge>
                                            )}
                                        </div>

                                        <div className="pl-12 space-y-1">
                                            <p className="text-sm font-bold text-foreground">{address.fullName}</p>
                                            <p className="text-xs text-muted-foreground">{address.address}</p>
                                            <p className="text-xs text-muted-foreground">{address.city}, {address.state} {address.zipCode}</p>
                                        </div>
                                    </div>

                                    {mode === 'manage' && (
                                        <div className="flex gap-1">
                                            <Button variant="ghost" size="icon" onClick={() => handleEditAddress(address)} className="h-8 w-8 rounded-full">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </Button>
                                            <Button variant="ghost" size="icon" onClick={() => handleDeleteAddress(address.id)} className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </Button>
                                        </div>
                                    )}

                                    {address.isDefault && <Check className="absolute top-5 right-5 w-4 h-4 text-primary" />}
                                </Label>
                            ))}
                        </RadioGroup>
                    )}
                </div>
            )}
        </div>
    );
}

export function getSavedAddresses(): Address[] {
    const savedAddresses = localStorage.getItem('shippingAddresses');
    return savedAddresses ? JSON.parse(savedAddresses) : [];
}

export function getDefaultAddress(): Address | null {
    const addresses = getSavedAddresses();
    return addresses.find(addr => addr.isDefault) || addresses[0] || null;
}
