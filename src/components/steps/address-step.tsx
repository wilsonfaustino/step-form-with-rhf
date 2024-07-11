import { Stepper } from '../stepper'
import { Button } from '../ui/button'
import { Input } from '../ui/input'
import { Label } from '../ui/label'

export const AddressStep = () => {
  return (
    <div className="space-y-6">
      <Stepper.Header title="Endereço" description="Nos informe seu endereço" />
      <div className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="state">Estado</Label>
          <Input id="state" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="city">Cidade</Label>
          <Input id="city" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="address">Endereço</Label>
          <Input id="address" />
        </div>
      </div>
      <Stepper.Footer>
        <Stepper.PreviousButton />
        <Button size="sm" type="submit">
          Finalizar
        </Button>
      </Stepper.Footer>
    </div>
  )
}
