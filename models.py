
from pydantic import BaseModel, validator, Field


class Product(BaseModel):
    id: int
    name: str = Field(..., min_length=1, max_length=100)
    description: str = Field(..., min_length=1, max_length=500)
    price: float = Field(..., gt=0)
    quantity: int = Field(..., ge=0)

    @validator('name')
    def name_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Name cannot be empty or whitespace')
        return v.strip()

    @validator('description')
    def description_must_not_be_empty(cls, v):
        if not v.strip():
            raise ValueError('Description cannot be empty or whitespace')
        return v.strip()
